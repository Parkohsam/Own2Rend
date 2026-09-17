// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/// @title MockNFT — Test ERC-721 for Own2Rent Development
/// @notice Anyone can call mint() to receive a test NFT. Only for testnet use.
contract MockNFT is ERC721URIStorage {
    uint256 private _tokenIdCounter;

    event Minted(address indexed to, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("Own2Rent Test NFT", "O2RNFT") {}

    /// @notice Mint a new test NFT to a given address.
    /// @param to       Recipient address
    /// @param uri      Token metadata URI (can be any string on testnet)
    /// @return tokenId The id of the newly minted token
    function mint(address to, string memory uri) external returns (uint256 tokenId) {
        tokenId = _tokenIdCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit Minted(to, tokenId, uri);
    }

    /// @notice Returns the total number of tokens minted.
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }
}
