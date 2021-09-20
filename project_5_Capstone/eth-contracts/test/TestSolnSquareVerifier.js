var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
let zKProof = require('../../zokrates/code/proof');

contract('TestSolnSquareVerifier', accounts => {
    const account_one = accounts[0];
    const account_two = accounts[1];

    beforeEach(async function () {
        this.contract = await SolnSquareVerifier.new({ from: account_one });
    })

    describe('SolnSquareVerifier test', function () {
        it('Should be able to create a new solution', async function () {
            let to = account_two;
            let input = [
                "0x0000000000000000000000000000000000000000000000000000000000000031",
                "0x0000000000000000000000000000000000000000000000000000000000000001"
            ];
            let proof = {
                "a": [
                    "0x22121f467ba36d13e46aa52138484da49cd258af9127c26b5c5c0ba6ac6b3b2f",
                    "0x292a38cb9464600ca9c4c7fde5d70dc8129d3646ee9aeac6ea27cf33c3956544"
                  ],
                "b": [
                    [
                      "0x0c73607394426dc92e1d65c7f930eb058769ee196313d7f034d82203dae24344",
                      "0x1e77beaaa71dcea2b5b483d3f6c104a976bc2b99d88b4f888287baafbf887b62"
                    ],
                    [
                      "0x0c86de45135abb2ff9a22eb5b984c2a674d8da5103b071796584132e2d775959",
                      "0x0646076a36e734975b6166b42ea5d2e8273a1c43624f03e30d0e10424815b986"
                    ]
                ],
                "c": [
                    "0x0e4374b116660f34cb611f9d15e0e62013842cfe33895d44ce06eba58643fc0b",
                    "0x1cc3dd1b7374ec5e1b8b0bab1c7864d7f6d111ff59d17b8d33dc829ede5f42e5"
                ]
            };
            let key = await this.contract.buildKey.call(to, proof.a, proof.b, proof.c, input);
            let CheckIfSolutionExists = await this.contract.CheckIfSolutionExists.call(key);
            assert.equal(CheckIfSolutionExists, false, "Solution already exists");

            await this.contract.addSolution(to, proof.a, proof.b, proof.c, input);
            CheckIfSolutionExists = await this.contract.CheckIfSolutionExists.call(key);
            assert.equal(CheckIfSolutionExists, true, "Solution was not added properly");
        })
    });

    it('ERC721 token can be minted', async function () {
        let minted = true;
        try {
            await this.contract.mintNFT(
                account_two, 
                2, 
                zKProof.proof.a,
                zKProof.proof.b,
                zKProof.proof.c,
                zKProof.inputs,
                { from: account_one }
            );
        }
        catch (e) {
            console.log(e);
            minted = false;
        }
        assert.equal(minted, true, "Token not minted");
    })
})