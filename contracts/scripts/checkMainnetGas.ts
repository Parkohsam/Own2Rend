import { ethers } from "hardhat";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://rpc.botchain.ai");
  const [deployer] = await ethers.getSigners();
  console.log("Account:", deployer.address);
  const balance = await provider.getBalance(deployer.address);
  console.log("Current Balance:", ethers.formatEther(balance), "BOT");

  const factory = await ethers.getContractFactory("Own2Rent");
  const deployTx = await factory.getDeployTransaction();
  const estimatedGas = await provider.estimateGas({
    from: deployer.address,
    data: deployTx.data,
  });
  console.log("Estimated Gas Units:", estimatedGas.toString());

  const gasPrice = (await provider.getFeeData()).gasPrice ?? 20_000_000_000n;
  const cost = estimatedGas * gasPrice;
  console.log("Estimated Cost at current gas price:", ethers.formatEther(cost), "BOT");
  
  if (balance < cost) {
    console.log(`\n❌ INSUFFICIENT BALANCE FOR MAINNET DEPLOYMENT:`);
    console.log(`Current Balance : ${ethers.formatEther(balance)} BOT`);
    console.log(`Required Minimum: ~${ethers.formatEther(cost)} BOT`);
    console.log(`Shortfall       : ~${ethers.formatEther(cost - balance)} BOT`);
  } else {
    console.log(`\n✅ Balance is sufficient!`);
  }
}

main().catch(console.error);
