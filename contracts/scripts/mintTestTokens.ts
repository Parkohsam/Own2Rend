import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Minting test tokens to:", deployer.address);

  const mockNFT = await ethers.getContractAt(
    "MockNFT",
    "0x6534051D574395D79a551aB525A4435b565b7Eee"
  );

  const minTip = 25_000_000_000n; // 25 Gwei
  const maxFeePerGas = 50_000_000_000n; // 50 Gwei

  // Mint Token #0
  console.log("Minting Token #0...");
  let tx = await mockNFT.mint(deployer.address, "ipfs://own2rent-token-0", {
    maxPriorityFeePerGas: minTip,
    maxFeePerGas: maxFeePerGas,
  });
  await tx.wait();
  console.log("Token #0 minted!");

  // Mint Token #1
  console.log("Minting Token #1...");
  tx = await mockNFT.mint(deployer.address, "ipfs://own2rent-token-1", {
    maxPriorityFeePerGas: minTip,
    maxFeePerGas: maxFeePerGas,
  });
  await tx.wait();
  console.log("Token #1 minted!");

  const totalSupply = await mockNFT.totalSupply();
  console.log("Total tokens now minted:", totalSupply.toString());
}

main().catch(console.error);
