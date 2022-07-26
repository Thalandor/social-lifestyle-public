// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Avatar.sol";
import {EIP712} from "./EIP712.sol";
import {EIP712Domain} from "./EIP712Domain.sol";
import {EIP3009} from "./EIP3009.sol";

contract TravelPonziCoin is EIP712Domain, EIP3009, Ownable {
    Avatar avatarContract;
    address private _owner;

    constructor(uint256 initialSupply) ERC20("TravelPonziCoin", "TPC") {
        _mint(msg.sender, initialSupply);
        _owner = msg.sender;
        DOMAIN_SEPARATOR = EIP712.makeDomainSeparator("TravelPonziCoin", "1");
    }

    modifier onlyAvatarContract() {
        require(
            msg.sender == address(avatarContract),
            "Only the avatar contract can call this function."
        );
        _;
    }

    function generateTokensNewUser(address user) public onlyAvatarContract {
        _mint(user, 100);
    }

    function setAvatarContract(address avatarAddress) public onlyOwner {
        avatarContract = Avatar(avatarAddress);
    }

    function tipUser(
        address _to,
        string memory category,
        uint256 value
    ) public {
        super.transfer(_to, value);
        avatarContract.sendTip(category, _to, value);
    }
}
