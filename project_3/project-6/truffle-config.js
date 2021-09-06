const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      websockets: true,
      networkCheckTimeout: 999999
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/4243cd6e24404d90aa26be793fe0e8f0`),
        network_id: 4,       // rinkeby's id
        gas: 4500000,        // rinkeby has a lower block limit than mainnet
        gasPrice: 10000000000,
        networkCheckTimeout: 1000000,
        timeoutBlocks: 200
    },
  },
  compilers: {
    solc: {
      version: "0.5.0"
    }
  }
};
