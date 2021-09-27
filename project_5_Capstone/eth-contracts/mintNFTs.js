const HDWalletProvider = require('truffle-hdwallet-provider');
const web3 = require('web3');
const fs = require("fs");

const MNEMONIC = fs.readFileSync(".secret").toString().trim();
const INFURA_KEY = fs.readFileSync(".infura_key").toString().trim();
let NFT_CONTRACT_ADDRESS = '0xe547136dfD5Ce675077Bd3c5148F02906611b450'
let OWNER_ADDRESS = '0x1d41247a91DbCb4699b08987cC172cF746c241A5'
const TOKEN_ID = 1

const proof =  JSON.parse(fs.readFileSync(`../zokrates/code/proof.json`));

const NFT_ABI = JSON.parse(fs.readFileSync(`./build/contracts/SolnSquareVerifier.json`)).abi;

(async function main() {
  try {
    const provider = new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/v3/${INFURA_KEY}`);
    const web3Instance = new web3(provider);
        
    const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "10000000" });

    console.log(`Minting token ${TOKEN_ID}`);
    await nftContract.methods.mintNFT(OWNER_ADDRESS, TOKEN_ID, proof.proof.a, proof.proof.b, proof.proof.c , proof.inputs).send({ from: OWNER_ADDRESS, "gas": 5000000, "gasPrice": 100000000000 }, (error, result) => {
        if (error) console.log(error);
        else console.log("Minted Token. Transaction: " + result); 
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();