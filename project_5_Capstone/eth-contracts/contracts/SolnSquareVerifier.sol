pragma solidity ^0.5.0;

import "./ERC721Mintable.sol";
import "./Verifier.sol";

contract SolnSquareVerifier is HouseListingToken, Verifier {
    struct Solution {
        address to;
        uint256[2] a;
        uint256[2][2] b;
        uint256[2] c;
        uint256[2] input;
    }

    Solution[] solutions;
    mapping(bytes32 => bool) uniqueSolutions;

    event SolutionAdded(
        address to,
        uint256[2] a,
        uint256[2][2] b,
        uint256[2] c,
        uint256[2] input
    );

    function CheckIfSolutionExists(bytes32 key) public view returns (bool) {
        return uniqueSolutions[key];
    }

    function buildKey(
        address to,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(to, a, b, c, input));
    }

    function addSolution(
        address to,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public {
        Solution memory newSolution;
        newSolution.to = to;
        newSolution.a = a;
        newSolution.b = b;
        newSolution.c = c;
        newSolution.input = input;
        bytes32 newSolutionKey =
            buildKey(
                newSolution.to,
                newSolution.a,
                newSolution.b,
                newSolution.c,
                newSolution.input
            );
        require(
            CheckIfSolutionExists(newSolutionKey) == false,
            "Solution already exists"
        );
        require(
            super.verifyTx(a, b, c, input),
            "Solution could not be verified"
        );
        // Add solution to make sure this solution can’t be used in the future
        solutions.push(newSolution);
        uniqueSolutions[newSolutionKey] = true;
        emit SolutionAdded(
            newSolution.to,
            newSolution.a,
            newSolution.b,
            newSolution.c,
            newSolution.input
        );
    }

    function mintNFT(
        address to,
        uint256 tokenId,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public {
        addSolution(to, a, b, c, input);
        super.mint(to, tokenId);
    }
}






















