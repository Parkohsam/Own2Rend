import { expect } from "chai";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { Own2Rent, MockNFT } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("Own2Rent", function () {
  // ─── Fixtures ──────────────────────────────────────────────────────────────

  async function deployFixture() {
    const [owner, renter, other]: HardhatEthersSigner[] =
      await ethers.getSigners();

    const MockNFTFactory = await ethers.getContractFactory("MockNFT");
    const mockNFT = (await MockNFTFactory.deploy()) as MockNFT;

    const Own2RentFactory = await ethers.getContractFactory("Own2Rent");
    const own2rent = (await Own2RentFactory.deploy()) as Own2Rent;

    // Mint token #0 to owner
    await mockNFT.mint(owner.address, "ipfs://test-metadata-1");
    const tokenId = 0n;

    return { own2rent, mockNFT, owner, renter, other, tokenId };
  }

  async function listedFixture() {
    const base = await deployFixture();
    const { own2rent, mockNFT, owner, tokenId } = base;

    const own2rentAddr = await own2rent.getAddress();
    await mockNFT.approve(own2rentAddr, tokenId);

    const pricePerDay = ethers.parseEther("0.1");
    const durationDays = 3n;
    await own2rent.listAsset(
      await mockNFT.getAddress(),
      tokenId,
      pricePerDay,
      durationDays
    );

    return { ...base, pricePerDay, durationDays, listingId: 0n };
  }

  // ─── Listing ───────────────────────────────────────────────────────────────

  describe("listAsset", function () {
    it("transfers NFT to escrow and creates a listing", async function () {
      const { own2rent, mockNFT, owner, tokenId } = await deployFixture();
      const own2rentAddr = await own2rent.getAddress();

      await mockNFT.approve(own2rentAddr, tokenId);

      const pricePerDay = ethers.parseEther("0.1");
      const durationDays = 3n;

      await expect(
        own2rent.listAsset(
          await mockNFT.getAddress(),
          tokenId,
          pricePerDay,
          durationDays
        )
      )
        .to.emit(own2rent, "AssetListed")
        .withArgs(
          0n,
          owner.address,
          await mockNFT.getAddress(),
          tokenId,
          pricePerDay,
          durationDays
        );

      // NFT is now held by contract
      expect(await mockNFT.ownerOf(tokenId)).to.equal(own2rentAddr);

      // Listing is stored correctly
      const listing = await own2rent.listings(0n);
      expect(listing.owner).to.equal(owner.address);
      expect(listing.active).to.be.true;
      expect(listing.rented).to.be.false;
    });

    it("reverts if caller is not token owner", async function () {
      const { own2rent, mockNFT, renter, tokenId } = await deployFixture();
      await expect(
        own2rent
          .connect(renter)
          .listAsset(await mockNFT.getAddress(), tokenId, 100n, 1n)
      ).to.be.revertedWith("Not token owner");
    });

    it("reverts without NFT approval", async function () {
      const { own2rent, mockNFT, tokenId } = await deployFixture();
      await expect(
        own2rent.listAsset(await mockNFT.getAddress(), tokenId, 100n, 1n)
      ).to.be.revertedWith("Contract not approved to transfer NFT");
    });

    it("reverts if price is 0", async function () {
      const { own2rent, mockNFT, tokenId } = await deployFixture();
      const addr = await own2rent.getAddress();
      await mockNFT.approve(addr, tokenId);
      await expect(
        own2rent.listAsset(await mockNFT.getAddress(), tokenId, 0n, 1n)
      ).to.be.revertedWith("Price must be greater than 0");
    });

    it("reverts if duration is 0 or > 365", async function () {
      const { own2rent, mockNFT, tokenId } = await deployFixture();
      const addr = await own2rent.getAddress();
      await mockNFT.approve(addr, tokenId);

      await expect(
        own2rent.listAsset(await mockNFT.getAddress(), tokenId, 100n, 0n)
      ).to.be.revertedWith("Duration must be at least 1 day");

      await expect(
        own2rent.listAsset(await mockNFT.getAddress(), tokenId, 100n, 366n)
      ).to.be.revertedWith("Duration cannot exceed 365 days");
    });
  });

  // ─── Renting ───────────────────────────────────────────────────────────────

  describe("rentAsset", function () {
    it("creates a rental, marks listing as rented, and pays owner", async function () {
      const { own2rent, renter, owner, pricePerDay, durationDays, listingId } =
        await listedFixture();

      const totalCost = pricePerDay * durationDays;
      const ownerBalanceBefore = await ethers.provider.getBalance(
        owner.address
      );

      await expect(
        own2rent.connect(renter).rentAsset(listingId, { value: totalCost })
      ).to.emit(own2rent, "AssetRented");

      // Listing should be marked rented
      const listing = await own2rent.listings(listingId);
      expect(listing.rented).to.be.true;

      // Owner received payment (accounting for gas from the listAsset tx)
      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
      expect(ownerBalanceAfter).to.be.gt(ownerBalanceBefore);
    });

    it("reverts with incorrect payment", async function () {
      const { own2rent, renter, pricePerDay, durationDays, listingId } =
        await listedFixture();
      const wrongAmount = pricePerDay * durationDays - 1n;
      await expect(
        own2rent
          .connect(renter)
          .rentAsset(listingId, { value: wrongAmount })
      ).to.be.revertedWith("Incorrect payment amount");
    });

    it("reverts if owner tries to rent own asset", async function () {
      const { own2rent, owner, pricePerDay, durationDays, listingId } =
        await listedFixture();
      const totalCost = pricePerDay * durationDays;
      await expect(
        own2rent.connect(owner).rentAsset(listingId, { value: totalCost })
      ).to.be.revertedWith("Cannot rent your own asset");
    });

    it("reverts on double rent", async function () {
      const { own2rent, renter, other, pricePerDay, durationDays, listingId } =
        await listedFixture();
      const totalCost = pricePerDay * durationDays;
      await own2rent.connect(renter).rentAsset(listingId, { value: totalCost });
      await expect(
        own2rent.connect(other).rentAsset(listingId, { value: totalCost })
      ).to.be.revertedWith("Asset already rented");
    });

    it("records correct start and end times", async function () {
      const { own2rent, renter, mockNFT, pricePerDay, durationDays, listingId } =
        await listedFixture();
      const totalCost = pricePerDay * durationDays;

      const tx = await own2rent
        .connect(renter)
        .rentAsset(listingId, { value: totalCost });
      const receipt = await tx.wait();
      const block = await ethers.provider.getBlock(receipt!.blockNumber);
      const blockTime = BigInt(block!.timestamp);

      const rental = await own2rent.getRentalByListing(listingId);
      expect(rental.startTime).to.equal(blockTime);
      expect(rental.endTime).to.equal(blockTime + durationDays * 86400n);
    });
  });

  // ─── Claim Back ────────────────────────────────────────────────────────────

  describe("claimBack", function () {
    it("returns NFT to owner after rental expires", async function () {
      const { own2rent, mockNFT, owner, renter, tokenId } =
        await deployFixture();
      const addr = await own2rent.getAddress();
      await mockNFT.approve(addr, tokenId);

      const pricePerDay = ethers.parseEther("0.1");
      const durationDays = 1n;
      await own2rent.listAsset(
        await mockNFT.getAddress(),
        tokenId,
        pricePerDay,
        durationDays
      );

      const listingId = 0n;
      await own2rent
        .connect(renter)
        .rentAsset(listingId, { value: pricePerDay * durationDays });

      // Fast-forward past rental end
      await time.increase(86401);

      await expect(own2rent.claimBack(listingId))
        .to.emit(own2rent, "AssetReturned")
        .withArgs(listingId, owner.address);

      expect(await mockNFT.ownerOf(tokenId)).to.equal(owner.address);
    });

    it("reverts during active rental", async function () {
      const { own2rent, mockNFT, renter, tokenId, pricePerDay, durationDays, listingId } =
        await listedFixture();
      await own2rent
        .connect(renter)
        .rentAsset(listingId, { value: pricePerDay * durationDays });

      await expect(own2rent.claimBack(listingId)).to.be.revertedWith(
        "Rental period not yet expired"
      );
    });

    it("reverts if not called by owner", async function () {
      const { own2rent, renter, listingId } = await listedFixture();
      await expect(
        own2rent.connect(renter).claimBack(listingId)
      ).to.be.revertedWith("Not listing owner");
    });

    it("allows owner to claim back an un-rented listing", async function () {
      const { own2rent, mockNFT, owner, tokenId, listingId } =
        await listedFixture();

      await expect(own2rent.claimBack(listingId))
        .to.emit(own2rent, "AssetReturned");

      expect(await mockNFT.ownerOf(tokenId)).to.equal(owner.address);
    });
  });

  // ─── Cancel Listing ────────────────────────────────────────────────────────

  describe("cancelListing", function () {
    it("cancels listing and returns NFT when not rented", async function () {
      const { own2rent, mockNFT, owner, tokenId, listingId } =
        await listedFixture();

      await expect(own2rent.cancelListing(listingId))
        .to.emit(own2rent, "ListingCancelled")
        .withArgs(listingId, owner.address);

      expect(await mockNFT.ownerOf(tokenId)).to.equal(owner.address);
    });

    it("reverts cancel during active rental", async function () {
      const { own2rent, renter, pricePerDay, durationDays, listingId } =
        await listedFixture();
      await own2rent
        .connect(renter)
        .rentAsset(listingId, { value: pricePerDay * durationDays });

      await expect(own2rent.cancelListing(listingId)).to.be.revertedWith(
        "Cannot cancel an active rental"
      );
    });
  });

  // ─── View Functions ────────────────────────────────────────────────────────

  describe("getAllListings", function () {
    it("returns all listings including inactive ones", async function () {
      const { own2rent, listingId } = await listedFixture();
      const all = await own2rent.getAllListings();
      expect(all.length).to.equal(1);
      expect(all[0].id).to.equal(listingId);
    });
  });

  describe("isRentalActive", function () {
    it("returns false before rental", async function () {
      const { own2rent, listingId } = await listedFixture();
      expect(await own2rent.isRentalActive(listingId)).to.be.false;
    });

    it("returns true during active rental", async function () {
      const { own2rent, renter, pricePerDay, durationDays, listingId } =
        await listedFixture();
      await own2rent
        .connect(renter)
        .rentAsset(listingId, { value: pricePerDay * durationDays });
      expect(await own2rent.isRentalActive(listingId)).to.be.true;
    });

    it("returns false after rental expires", async function () {
      const { own2rent, renter, pricePerDay, durationDays, listingId } =
        await listedFixture();
      await own2rent
        .connect(renter)
        .rentAsset(listingId, { value: pricePerDay * durationDays });

      await time.increase(durationDays * 86400n + 1n);
      expect(await own2rent.isRentalActive(listingId)).to.be.false;
    });
  });

  // ─── MockNFT ───────────────────────────────────────────────────────────────

  describe("MockNFT", function () {
    it("anyone can mint", async function () {
      const { mockNFT, renter } = await deployFixture();
      await mockNFT.connect(renter).mint(renter.address, "ipfs://test-2");
      expect(await mockNFT.ownerOf(1n)).to.equal(renter.address);
    });

    it("tracks total supply", async function () {
      const { mockNFT, renter } = await deployFixture();
      // token 0 already minted in fixture
      expect(await mockNFT.totalSupply()).to.equal(1n);
      await mockNFT.connect(renter).mint(renter.address, "ipfs://test-2");
      expect(await mockNFT.totalSupply()).to.equal(2n);
    });
  });
});
