import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const mockNFT = await ethers.getContractAt(
    "MockNFT",
    "0x6534051D574395D79a551aB525A4435b565b7Eee"
  );
  const supply = await mockNFT.totalSupply();
  console.log("Total supply:", supply.toString());
  for (let i = 0; i <= Number(supply); i++) {
    try {
      const owner = await mockNFT.ownerOf(i);
      console.log(`Token #${i} is owned by ${owner}`);
    } catch (e: any) {
      console.log(`Token #${i} does NOT exist!`);
    }
  }
}

main().catch(console.error);
