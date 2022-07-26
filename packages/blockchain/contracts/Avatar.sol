// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "./TravelPonziCoin.sol";

contract Avatar is ERC721Enumerable, ERC721URIStorage, Ownable {
    TravelPonziCoin tokenContract;

    struct Reward {
        string category;
        uint tokens;
    }

    mapping(address => Reward[]) rewards;

    constructor() ERC721("Ponzi Avatar", "PNZA") {}

    modifier onlyTravelPonziCoinContract() {
        require(
            msg.sender == address(tokenContract),
            "Only the token contract can call this function."
        );
        _;
    }

    function createAvatar(string memory _tokenURI, address userAddress)
        public
        onlyOwner
    {
        uint supply = totalSupply();
        super._mint(userAddress, supply);
        super._setTokenURI(supply, _tokenURI);
        tokenContract.generateTokensNewUser(userAddress);
    }

    function setTokenContract(address avatarAddress) public onlyOwner {
        tokenContract = TravelPonziCoin(avatarAddress);
    }

    function getCategoryIndex(address from, string memory category)
        private
        view
        returns (bool hasCategory, uint index)
    {
        Reward[] storage rewardList = rewards[from];
        for (uint i = 0; i < rewardList.length; i++) {
            Reward storage reward = rewardList[i];
            bool isCategoryEqual = keccak256(
                abi.encodePacked(reward.category)
            ) == keccak256(abi.encodePacked(category));
            if (isCategoryEqual) {
                return (true, i);
            }
        }
        return (false, 0);
    }

    function getTokensByCategory(address from, string memory category)
        public
        view
        returns (uint tokens)
    {
        (bool hasCategory, uint index) = getCategoryIndex(from, category);
        if (hasCategory) {
            Reward[] memory rewardArray = rewards[from];
            Reward memory reward = rewardArray[index];
            return reward.tokens;
        }
        return tokens;
    }

    function sendTip(
        string memory category,
        address to,
        uint tokens
    ) public onlyTravelPonziCoinContract {
        (bool hasCategory, uint index) = getCategoryIndex(to, category);
        if (hasCategory) {
            Reward[] storage rewardArray = rewards[to];
            Reward storage reward = rewardArray[index];
            reward.tokens += tokens;
        } else {
            Reward memory reward = Reward(category, tokens);
            rewards[to].push(reward);
        }
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
