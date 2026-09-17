// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title Own2Rent — Digital Asset Rental Platform
/// @notice Allows NFT owners to list ERC-721 assets for rent and renters to pay
///         in native token (BOT) for temporary access. Payments flow directly to
///         the owner; the contract only holds the NFT in escrow.
contract Own2Rent is ReentrancyGuard, IERC721Receiver {

    // ─────────────────────────────────────────────────────────────────────────
    // Data Structures
    // ─────────────────────────────────────────────────────────────────────────

    struct Listing {
        uint256 id;
        address owner;
        address nftContract;
        uint256 tokenId;
        uint256 pricePerDay;  // in wei (native BOT)
        uint256 durationDays; // fixed rental window offered by owner
        bool active;          // false once cancelled or returned
        bool rented;          // true while a rental agreement is active
    }

    struct RentalAgreement {
        uint256 listingId;
        address renter;
        uint256 startTime;
        uint256 endTime;
        bool active;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // State
    // ─────────────────────────────────────────────────────────────────────────

    uint256 private _listingIdCounter;
    uint256 private _rentalIdCounter;

    mapping(uint256 => Listing) public listings;
    mapping(uint256 => RentalAgreement) public rentals;
    /// @dev Maps a listingId to its rental agreement id
    mapping(uint256 => uint256) public listingToRental;

    // ─────────────────────────────────────────────────────────────────────────
    // Events
    // ─────────────────────────────────────────────────────────────────────────

    event AssetListed(
        uint256 indexed listingId,
        address indexed owner,
        address nftContract,
        uint256 tokenId,
        uint256 pricePerDay,
        uint256 durationDays
    );

    event AssetRented(
        uint256 indexed rentalId,
        uint256 indexed listingId,
        address indexed renter,
        uint256 startTime,
        uint256 endTime
    );

    event AssetReturned(uint256 indexed listingId, address indexed owner);
    event ListingCancelled(uint256 indexed listingId, address indexed owner);

    // ─────────────────────────────────────────────────────────────────────────
    // Modifiers
    // ─────────────────────────────────────────────────────────────────────────

    modifier onlyListingOwner(uint256 listingId) {
        require(listings[listingId].owner == msg.sender, "Not listing owner");
        _;
    }

    modifier listingExists(uint256 listingId) {
        require(listingId < _listingIdCounter, "Listing does not exist");
        _;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Write Functions
    // ─────────────────────────────────────────────────────────────────────────

    /// @notice List an ERC-721 NFT for rent. The NFT is transferred into escrow.
    /// @param nftContract Address of the ERC-721 contract
    /// @param tokenId     The token to rent out
    /// @param pricePerDay Rental price in wei per day (native token)
    /// @param durationDays Fixed rental window in days (1–365)
    function listAsset(
        address nftContract,
        uint256 tokenId,
        uint256 pricePerDay,
        uint256 durationDays
    ) external nonReentrant {
        require(nftContract != address(0), "Invalid NFT contract");
        require(pricePerDay > 0, "Price must be greater than 0");
        require(durationDays >= 1, "Duration must be at least 1 day");
        require(durationDays <= 365, "Duration cannot exceed 365 days");

        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Not token owner");
        require(
            nft.isApprovedForAll(msg.sender, address(this)) ||
            nft.getApproved(tokenId) == address(this),
            "Contract not approved to transfer NFT"
        );

        // Transfer NFT into escrow
        nft.safeTransferFrom(msg.sender, address(this), tokenId);

        uint256 listingId = _listingIdCounter++;
        listings[listingId] = Listing({
            id: listingId,
            owner: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            pricePerDay: pricePerDay,
            durationDays: durationDays,
            active: true,
            rented: false
        });

        emit AssetListed(listingId, msg.sender, nftContract, tokenId, pricePerDay, durationDays);
    }

    /// @notice Rent a listed asset. Caller pays `pricePerDay × durationDays` in
    ///         native token. Payment is forwarded immediately to the owner.
    /// @param listingId The listing to rent
    function rentAsset(uint256 listingId)
        external
        payable
        nonReentrant
        listingExists(listingId)
    {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing not active");
        require(!listing.rented, "Asset already rented");
        require(listing.owner != msg.sender, "Cannot rent your own asset");

        uint256 totalCost = listing.pricePerDay * listing.durationDays;
        require(msg.value == totalCost, "Incorrect payment amount");

        uint256 rentalId = _rentalIdCounter++;
        uint256 startTime = block.timestamp;
        uint256 endTime = startTime + (listing.durationDays * 1 days);

        rentals[rentalId] = RentalAgreement({
            listingId: listingId,
            renter: msg.sender,
            startTime: startTime,
            endTime: endTime,
            active: true
        });

        listingToRental[listingId] = rentalId;
        listing.rented = true;

        // Forward payment directly to owner (no funds held by contract)
        (bool success, ) = payable(listing.owner).call{value: msg.value}("");
        require(success, "Payment transfer failed");

        emit AssetRented(rentalId, listingId, msg.sender, startTime, endTime);
    }

    /// @notice Owner claims back their NFT after the rental period has expired,
    ///         or immediately if the asset was never rented.
    /// @param listingId The listing to claim back
    function claimBack(uint256 listingId)
        external
        nonReentrant
        listingExists(listingId)
        onlyListingOwner(listingId)
    {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing not active");

        if (listing.rented) {
            uint256 rentalId = listingToRental[listingId];
            RentalAgreement storage rental = rentals[rentalId];
            require(
                block.timestamp >= rental.endTime,
                "Rental period not yet expired"
            );
            rental.active = false;
        }

        listing.active = false;
        listing.rented = false;

        IERC721(listing.nftContract).safeTransferFrom(
            address(this),
            listing.owner,
            listing.tokenId
        );

        emit AssetReturned(listingId, listing.owner);
    }

    /// @notice Owner cancels a listing before any rental has occurred.
    ///         Returns the NFT from escrow immediately.
    /// @param listingId The listing to cancel
    function cancelListing(uint256 listingId)
        external
        nonReentrant
        listingExists(listingId)
        onlyListingOwner(listingId)
    {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing not active");
        require(!listing.rented, "Cannot cancel an active rental");

        listing.active = false;

        IERC721(listing.nftContract).safeTransferFrom(
            address(this),
            listing.owner,
            listing.tokenId
        );

        emit ListingCancelled(listingId, listing.owner);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // View Functions
    // ─────────────────────────────────────────────────────────────────────────

    /// @notice Returns all listings (active and inactive). Clients should filter.
    function getAllListings() external view returns (Listing[] memory) {
        Listing[] memory result = new Listing[](_listingIdCounter);
        for (uint256 i = 0; i < _listingIdCounter; i++) {
            result[i] = listings[i];
        }
        return result;
    }

    /// @notice Returns the rental agreement associated with a listing.
    function getRentalByListing(uint256 listingId)
        external
        view
        listingExists(listingId)
        returns (RentalAgreement memory)
    {
        uint256 rentalId = listingToRental[listingId];
        return rentals[rentalId];
    }

    /// @notice Returns true if the listing's rental is still within its window.
    function isRentalActive(uint256 listingId)
        external
        view
        listingExists(listingId)
        returns (bool)
    {
        if (!listings[listingId].rented) return false;
        uint256 rentalId = listingToRental[listingId];
        return block.timestamp < rentals[rentalId].endTime;
    }

    /// @notice Returns the total number of listings ever created.
    function getTotalListings() external view returns (uint256) {
        return _listingIdCounter;
    }

    /// @notice Returns the total number of rental agreements ever created.
    function getTotalRentals() external view returns (uint256) {
        return _rentalIdCounter;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ERC-721 Receiver
    // ─────────────────────────────────────────────────────────────────────────

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
