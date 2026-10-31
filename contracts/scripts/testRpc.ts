import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://rpc.botchain.ai");
  const network = await provider.getNetwork();
  console.log("Connected to Network:", network.name);
  console.log("Chain ID:", network.chainId.toString());
  const blockNumber = await provider.getBlockNumber();
  console.log("Latest Block Number:", blockNumber);
}

main().catch(console.error);
