# FlightSurety

FlightSurety is a sample application project for Udacity's Blockchain course.

## Install

This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle), dApp scaffolding (using HTML, CSS and JS) and server app scaffolding.

To install, download or clone the repo, then:

```
npm install
```
```
truffle compile
```
## Develop Client


Run Ganache CLI: 
```
ganache-cli -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" --accounts=50 --deterministic --gasLimit=0x1fffffffffffff --allowUnlimitedContractSize
```

To run truffle tests:

```
truffle test ./test/flightSurety.js
```
```
truffle test ./test/oracles.js
```

## Develop Server

```
npm run server
```
## Deploy dapp
```
truffle migrate --reset --network development
```
```
npm run dapp
```
To view dapp:

`http://localhost:8000`


### Libraries
Library      | Version
------------ | -------------
Node             |v14.17.6
Truffle          |v5.4.9
Solidity         |v0.5.16
web3             |v1.5.2
openzeppelin-solidity |v2.1.2
truffle-hdwallet-provider |v1.0.17
truffle-assertions   |v0.9.2
@truffle/contract | 4.3.9
truffle-assertions             |v0.9.2
Chai         |v4.2.0

## Resources

* [How does Ethereum work anyway?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369)
* [BIP39 Mnemonic Generator](https://iancoleman.io/bip39/)
* [Truffle Framework](http://truffleframework.com/)
* [Ganache Local Blockchain](http://truffleframework.com/ganache/)
* [Remix Solidity IDE](https://remix.ethereum.org/)
* [Solidity Language Reference](http://solidity.readthedocs.io/en/v0.4.24/)
* [Ethereum Blockchain Explorer](https://etherscan.io/)
* [Web3Js Reference](https://github.com/ethereum/wiki/wiki/JavaScript-API)