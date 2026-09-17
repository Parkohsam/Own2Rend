import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

/**
 * Own2Rent Deployment Module
 *
 * Deploys:
 * 1. MockNFT — Test ERC-721 NFT collection
 * 2. Own2Rent — Main rental platform contract
 */
export default buildModule("Own2RentModule", (m) => {
  const mockNFT = m.contract("MockNFT");

  const own2rent = m.contract("Own2Rent");

  return {
    mockNFT,
    own2rent,
  };
});