import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("==================================================");
  console.log("🚀 Deploying Own2Rent to BOT Chain (Bohr) Mainnet");
  console.log("   Chain ID: 677 | RPC: https://rpc.botchain.ai");
  console.log("==================================================");

  const [deployer] = await ethers.getSigners();
  console.log("Deployer Address:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer Balance:", ethers.formatEther(balance), "BOT");

  const feeData = await ethers.provider.getFeeData();
  const currentGasPrice = feeData.gasPrice ?? 20_000_000_000n;
  const minTip = 20_000_000_000n; // 20 Gwei (minimum required on Bohr / BOT Chain)
  const maxFeePerGas = currentGasPrice > minTip ? currentGasPrice + 2_000_000_000n : 22_000_000_000n;
  const estimatedCost = 1_350_000n * maxFeePerGas;

  console.log("\nGas Settings:");
  console.log("- maxPriorityFeePerGas:", ethers.formatUnits(minTip, "gwei"), "Gwei");
  console.log("- maxFeePerGas        :", ethers.formatUnits(maxFeePerGas, "gwei"), "Gwei");
  console.log("- Estimated Deployment Cost: ~" + ethers.formatEther(estimatedCost) + " BOT");

  if (balance < estimatedCost) {
    throw new Error(
      `\n❌ INSUFFICIENT BOT BALANCE ON MAINNET!\n` +
      `Your wallet (${deployer.address}) currently has: ${ethers.formatEther(balance)} BOT\n` +
      `Minimum needed for deployment transaction: ~${ethers.formatEther(estimatedCost)} BOT\n` +
      `Please transfer at least ~${ethers.formatEther(estimatedCost - balance)} BOT (recommended: 0.05 - 0.1 BOT) to your wallet, then re-run.`
    );
  }

  console.log("\nDeploying Own2Rent Main Contract...");
  const Own2Rent = await ethers.getContractFactory("Own2Rent");
  const own2rent = await Own2Rent.deploy({
    maxPriorityFeePerGas: minTip,
    maxFeePerGas: maxFeePerGas,
  });
  await own2rent.waitForDeployment();
  const own2rentAddress = await own2rent.getAddress();

  console.log(">>> Own2Rent deployed successfully to:", own2rentAddress);

  console.log("\n==================================================");
  console.log("🎉 MAINNET DEPLOYMENT COMPLETE!");
  console.log("Network  : BOT Chain Mainnet (Chain ID 677)");
  console.log("Own2Rent :", own2rentAddress);
  console.log("Explorer : https://scan.botchain.ai/address/" + own2rentAddress);
  console.log("==================================================");

  // Update frontend/src/contracts/addresses.ts
  const addressesFilePath = path.resolve(
    __dirname,
    "../../frontend/src/contracts/addresses.ts"
  );
  if (fs.existsSync(addressesFilePath)) {
    let content = fs.readFileSync(addressesFilePath, "utf-8");
    if (!content.includes("677:")) {
      content = content.replace(
        "968: {",
        `677: {
    OWN2RENT: '${own2rentAddress}' as \`0x\${string}\`,
  },
  968: {`
      );
    } else {
      content = content.replace(
        /677:\s*\{[\s\S]*?OWN2RENT:\s*'0x[0-9a-fA-F]+'/,
        `677: {\n    OWN2RENT: '${own2rentAddress}'`
      );
    }
    fs.writeFileSync(addressesFilePath, content, "utf-8");
    console.log("\n[Frontend] Updated frontend/src/contracts/addresses.ts with Mainnet address!");
  }
}

main().catch((error) => {
  console.error("Mainnet deployment failed:", error);
  process.exitCode = 1;
});
