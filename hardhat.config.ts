import * as dotenv from "dotenv";
import { config as dotenvConfig } from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "solidity-coverage";

import networkConfig from "./networks"

import { NetworkUserConfig } from "hardhat/types";
import { resolve } from "path";

// const dotenv = require("dotenv");
// dotenv.config();
dotenvConfig({ path: resolve(__dirname, "./.env") });

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});



// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

// const mnemonic: string | undefined = process.env.MNEMONIC;
// if (!mnemonic) {
//   throw new Error("Please set your MNEMONIC in a .env file");
// }
//
// const infuraApiKey: string | undefined = process.env.INFURA_API_KEY;
// if (!infuraApiKey) {
//   throw new Error("Please set your INFURA_API_KEY in a .env file");
// }

const chainIds = {
  arbitrumOne: 42161,
  avalanche: 43114,
  bsc: 56,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  optimism: 10,
  polygon: 137,
  rinkeby: 4,
  ropsten: 3,
};

// function getChainConfig(network: keyof typeof chainIds): NetworkUserConfig {
//   const url: string = "https://" + network + ".infura.io/v3/" + infuraApiKey;
//   return {
//     accounts: {
//       count: 10,
//       mnemonic,
//       path: "m/44'/60'/0'/0",
//     },
//     chainId: chainIds[network],
//     url,
//   };
// }

function compileSetting(version: string, runs: number) {
  return {
    version: version,
    settings: {
      optimizer: {
        enabled: true,
        runs: runs,
      },
    },
  };
}

let config: HardhatUserConfig = {
  etherscan: {
    apiKey: {
      arbitrumOne: process.env.ARBSCAN_API_KEY,
      avalanche: process.env.SNOWTRACE_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      kovan: process.env.ETHERSCAN_API_KEY,
      mainnet: process.env.ETHERSCAN_API_KEY,
      optimisticEthereum: process.env.OPTIMISM_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      rinkeby: process.env.ETHERSCAN_API_KEY,
      ropsten: process.env.ETHERSCAN_API_KEY,
    },
  },
  networks: {
    hardhat: {
      accounts: {
        // mnemonic,
      },
      chainId: chainIds.hardhat,
    },
    // arbitrumOne: getChainConfig("arbitrumOne"),
    // avalanche: getChainConfig("avalanche"),
    // bsc: getChainConfig("bsc"),
    // goerli: getChainConfig("goerli"),
    // kovan: getChainConfig("kovan"),
    // mainnet: getChainConfig("mainnet"),
    // optimism: getChainConfig("optimism"),
    // polygon: getChainConfig("polygon"),
    // rinkeby: getChainConfig("rinkeby"),
    // ropsten: getChainConfig("ropsten"),
    // ropsten: {
    //   url: process.env.ROPSTEN_URL || "",
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },


    // rinkeby: {
    //   url: "https://eth-mainnet.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
    //   accounts: ["0x1a9964d13e5706584ce7aa18752a19154a5e0e67397b144a0e672e9bee973b15"]
    // }

  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },

  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  solidity: {
    compilers: [
      // {
      //   version: "0.4.11"
      // },

      // compileSetting("0.5.3",200),
      // compileSetting("0.5.12",200),
      // compileSetting("0.6.12",200),
      // compileSetting("0.8.20",200),
      // compileSetting("0.8.4",200),
      // compileSetting("0.8.6",200),
      // compileSetting("0.8.9",200),
      compileSetting("0.8.11",200),
      // compileSetting("0.8.19",200)
    ],
  },
};

for(var key in networkConfig.networks){
  if(networkConfig.networks.hasOwnProperty(key)===true){
    // @ts-ignore
    config.networks[key]=networkConfig.networks[key];
  }
}
config.defaultNetwork = networkConfig.defaultNetwork;

console.log("defaultNetwork " + config.defaultNetwork);

export default config;
