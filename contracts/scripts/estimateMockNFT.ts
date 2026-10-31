import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const factory = await ethers.getContractFactory("MockNFT");
  const deployTx = await factory.getDeployTransaction();
  const gas = await ethers.provider.estimateGas({
    from: deployer.address,
    data: deployTx.data,
  });
  console.log("Estimated MockNFT gas units:", gas.toString());
  const feeData = await ethers.provider.getFeeData();
  const gasPrice = feeData.gasPrice ?? 20_000_000_000n;
  const cost = gas * gasPrice;
  console.log("Gas price:", ethers.formatUnits(gasPrice, "gwei"), "Gwei");
  console.log("Estimated MockNFT deployment cost:", ethers.formatEther(cost), "BOT");
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Current balance:", ethers.formatEther(balance), "BOT");
}

main().catch(console.error);
