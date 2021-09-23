# Udacity Blockchain Capstone

The capstone builds upon the knowledge gained in the Nanodegree program in order to build a decentralized real estate marketplace solution by using

- ERC721 tokens to sell and buy non-fungible real estate assets on the OpenSea marketplace.

- Zero knowledge proofs (zk-SNARK) to ensure that only the owner of an asset has the right to mint ERC721 tokens for it.



### Libraries
Library      | Version
------------ | -------------
Node             |v10.19.0
Solidity         |v0.5.16
Truffle          |v5.4.11
web3             |v1.5.2
openzeppelin-solidity |v2.2.0
truffle-hdwallet-provider |v1.5.0


## Installation

To install, download or clone this repo, then run:

`npm install`


## Implementing Zokrates (Ubuntu 20.04)
### **Run Zokrates**
    ```
    cd <path to project folder>/zokrates/code

    docker run -v ./:/home/zokrates/code -ti zokrates/zokrates /bin/bash
    ```
### **Compile ZoKrates DSL program code**
    ```
    cd code 

    zokrates compile -i square/square.code
    ```
### **Generate the trusted setup**
    ```
    zokrates setup
    ```
### **Compute witness**
    ```
    zokrates compute-witness -a 7 49
    ```
### **Generate a proof of computation**
    ```
    zokrates generate-proof
    ```
### **export solidity verifier (verifier.sol)**
    ```
    zokrates export-verifier

    mv verifier.sol ../../eth-contracts/contracts
    ```


## Building and Testing
Compile and test the contracts:

```
ganache-cli --gasLimit=0x1fffffffffffff

cd eth-contracts

truffle compile

truffle test
```

## Deployment

```
truffle migrate --reset --network rinkeby

```

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
