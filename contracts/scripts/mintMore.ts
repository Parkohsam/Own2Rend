import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Minting more test tokens to:", deployer.address);

  const mockNFT = await ethers.getContractAt(
    "MockNFT",
    "0x6534051D574395D79a551aB525A4435b565b7Eee"
  );

  const minTip = 25_000_000_000n; // 25 Gwei
  const maxFeePerGas = 50_000_000_000n; // 50 Gwei

  for (let i = 2; i <= 5; i++) {
    console.log(`Minting Token #${i}...`);
    const tx = await mockNFT.mint(deployer.address, `ipfs://own2rent-token-${i}`, {
      maxPriorityFeePerGas: minTip,
      maxFeePerGas: maxFeePerGas,
    });
    await tx.wait();
    console.log(`Token #${i} minted!`);
  }

  const totalSupply = await mockNFT.totalSupply();
  console.log("Total tokens now minted:", totalSupply.toString());
}

main().catch(console.error);
