import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const isValidPrivateKey = (key?: string): boolean => {
  if (!key) return false;

  const cleanKey = key.startsWith("0x") ? key.slice(2) : key;

  return (
    cleanKey.length === 64 &&
    /^[0-9a-fA-F]+$/.test(cleanKey)
  );
};

const rawKey = process.env.PRIVATE_KEY;

if (!isValidPrivateKey(rawKey)) {
  throw new Error(
    "PRIVATE_KEY is missing or invalid. Check your .env file."
  );
}

const PRIVATE_KEY = rawKey!.startsWith("0x")
  ? rawKey!
  : `0x${rawKey}`;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "cancun",
    },
  },

  networks: {
    hardhat: {
      chainId: 31337,
    },

    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },

    bohr: {
      url: "https://rpc.bohr.life",
      chainId: 968,
      accounts: [PRIVATE_KEY],
      gasPrice: 40_000_000_000,
      gasMultiplier: 1.2,
      timeout: 120_000,
    },
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },

  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
  },
};

export default config;