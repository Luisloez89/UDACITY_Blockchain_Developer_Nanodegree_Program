var HouseListingToken = artifacts.require('HouseListingToken');

contract('TestERC721Mintable', accounts => {
    const MINTED_TOKENS = 5;

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await HouseListingToken.new({from: account_one});

            // mint multiple tokens
            for(let i=1; i <= MINTED_TOKENS; i++) {
                await this.contract.mint(account_one, i);
            }    

            await this.contract.mint(account_two, 100);
        })

        it('should return total supply', async function () { 
            let success = true;
            let totalSupply = 0;
            try{
                totalSupply = await this.contract.totalSupply();
            }
            catch{
                success = false
            }
            assert.equal(success, true, "Error caught while calling totalSupply()");
            if (success) {
                assert.equal(totalSupply, MINTED_TOKENS+1, `Total token supply should be ${MINTED_TOKENS}.`);
            }            
        })

        it('should get token balance', async function () { 
            let success = true;
            try{
                b1 = await this.contract.balanceOf(account_one);
                b2 = await this.contract.balanceOf(account_two);
            }
            catch{
                success = false
            }
            assert.equal(success, true, "Error caught while calling balanceOf()");
            if (success) {
                assert.equal(b1.eq(web3.utils.toBN(5)), true, `balance of account_one should be ${MINTED_TOKENS}.`);
                assert.equal(b2.eq(web3.utils.toBN(1)), true, `balance of account_tow should be 1.`);
            } 
        })

        it('should return token uri', async function () { 
            let success = true;
            let token1URI, token2URI;
            try{
                token1URI = await this.contract.tokenURI(1);
                token2URI = await this.contract.tokenURI(2);
            }
            catch{
                success = false
            }
            assert.equal(success, true, "Error caught while calling tokenURI()");
            if (success) {
                assert.equal(token1URI, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1', `Wrong baseTokenURI.`);
                assert.equal(token2URI, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2', `Wrong baseTokenURI.`);
            } 
        })

        it('should transfer token from one owner to another', async function () { 
            let success = true;
            try{
                await this.contract.transferFrom(account_one, account_two, 1, {from: account_one});
            }
            catch(e) {
                success = false
            }
            assert.equal(success, true, "Error caught while calling transferFrom()");
            if (success) {
                var ownerOfaccount_twoToken = await this.contract.ownerOf(1);
                assert.equal(ownerOfaccount_twoToken, account_two, "Invalid owner");

                let b1 = await this.contract.balanceOf(account_one);
                let b2 = await this.contract.balanceOf(account_two);

                assert.equal(b1, 4, "Wrong account_one balance.");
                assert.equal(b2, 2, "Wrong account_tow balance.")
            }            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await HouseListingToken.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            var success = true;
            try {
                await this.contract.mint(account_one, 6, {from: account_two});
            } catch {
                success = false;
            }
            assert.equal(success, false, "Wrong caller");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner();
            assert.equal(owner, account_one, "Wrong contract owner");            
        })
    });
})