import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("--------------------------------------------------");
  const networkName = network.name;
  console.log(`Deploying to ${networkName} (Chain ID: ${network.config.chainId})`);

  const [deployer] = await ethers.getSigners();
  console.log("Deployer Address:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer Balance:", ethers.formatEther(balance), networkName === "bohr" ? "BOT" : "ETH");

  if (balance === 0n) {
    throw new Error(
      `Deployer wallet has 0 ${networkName === "bohr" ? "BOT" : "ETH"}! Please request testnet ${networkName === "bohr" ? "BOT" : "ETH"} tokens from the faucet or transfer some ${networkName === "bohr" ? "BOT" : "ETH"} to ` + deployer.address
    );
  }

  // Bohr testnet node requires minimum tip (priority fee) of 20 Gwei (20,000,000,000 wei)
  const minTip = networkName === "bohr" ? 25_000_000_000n : 25_000_000_000n; // 25 Gwei (safely above 20 Gwei minimum)
  const maxFeePerGas = networkName === "bohr" ? 50_000_000_000n : 100_000_000_000n; // 50 Gwei Bohr, 100 Gwei mainnet

  console.log("\nGas Settings:");
  console.log("- maxPriorityFeePerGas:", ethers.formatUnits(minTip, "gwei"), "Gwei");
  console.log("- maxFeePerGas:", ethers.formatUnits(maxFeePerGas, "gwei"), "Gwei");

// 1. Deploy MockNFT
  console.log("\n[1/2] Deploying MockNFT...");
  const MockNFT = await ethers.getContractFactory("MockNFT");
  const mockNFT = await MockNFT.deploy({
    maxPriorityFeePerGas: minTip,
    maxFeePerGas: maxFeePerGas,
  });
  await mockNFT.waitForDeployment();
  const mockNftAddress = await mockNFT.getAddress();
  console.log(">>> MockNFT deployed to:", mockNftAddress);

  // 2. Deploy Own2Rent
  console.log("\n[2/2] Deploying Own2Rent...");
  const Own2Rent = await ethers.getContractFactory("Own2Rent");
  const own2rent = await Own2Rent.deploy({
    maxPriorityFeePerGas: minTip,
    maxFeePerGas: maxFeePerGas,
  });
  await own2rent.waitForDeployment();
  const own2rentAddress = await own2rent.getAddress();
  console.log(">>> Own2Rent deployed to:", own2rentAddress);

  console.log("\n==================================================");
  console.log("DEPLOYMENT COMPLETE!");
  console.log("MockNFT  :", mockNftAddress);
  console.log("Own2Rent :", own2rentAddress);
  console.log("Explorer : https://scan.bohr.life/address/" + own2rentAddress);
  console.log("==================================================");

  // Automatically update frontend/src/contracts/addresses.ts
  const addressesFilePath = path.resolve(
    __dirname,
    "../../frontend/src/contracts/addresses.ts"
  );
  if (fs.existsSync(addressesFilePath)) {
    // Determine which chain we're on and update addresses accordingly
    const chainId = network.config.chainId;
    let own2rentAddr, mockNftAddr;

    if (chainId === 968) {
      // Bohr testnet
      own2rentAddr = own2rentAddress;
      mockNftAddress = mockNftAddress;
    } else if (chainId === 1) {
      // Mainnet - use provided addresses or placeholders
      own2rentAddr = own2rentAddress;
      mockNftAddress = mockNftAddress;
    } else {
      // Local network - use hardcoded defaults
      own2rentAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
      mockNftAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
    }

    const updatedContent = `/**
   * Contract addresses — updated automatically by deployment script.
   */

export const CONTRACT_ADDRESSES = {
  /** Hardhat local node (chainId 31337) */
  31337: {
    OWN2RENT: '0x5FbDB2315678afecb367f032d93F642f64180aa3' as \`0x\${string}\`,
    MOCK_NFT:  '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' as \`0x\${string}\`,
  },
  /** Bohr Testnet (chainId 968) */
  968: {
    OWN2RENT: '${own2rentAddress}' as \`0x\${string}\`,
    MOCK_NFT:  '${mockNftAddress}' as \`0x\${string}\`,
  },
  /** BOT Chain (Bohr) Mainnet (chainId 677) */
  677: {
    OWN2RENT: '0xfc1e08f6A6454fa53f05be0023B30c68eA25EbbD' as \`0x\${string}\`,
    MOCK_NFT:  '0x0000000000000000000000000000000000000000' as \`0x\${string}\`,
  },
  /** Ethereum Mainnet (chainId 1) */
  1: {
    OWN2RENT: '0x0000000000000000000000000000000000000000' as \`0x\${string}\`,
    MOCK_NFT:  '0x0000000000000000000000000000000000000000' as \`0x\${string}\`,
  },
} as const

export type SupportedChainId = keyof typeof CONTRACT_ADDRESSES

/** Returns addresses for the given chainId, falling back to local defaults. */
export function getAddresses(chainId?: number) {
  const id = chainId as SupportedChainId
  return CONTRACT_ADDRESSES[id] ?? CONTRACT_ADDRESSES[968]
}
`;
    fs.writeFileSync(addressesFilePath, updatedContent, "utf-8");
    console.log("\n[Frontend] Updated frontend/src/contracts/addresses.ts with deployed addresses!");
  }
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
