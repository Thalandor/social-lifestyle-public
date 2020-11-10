// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./libs/Ownable.sol";
import "./Avatar.sol";
import { EIP712 } from "./libs/EIP712.sol";
import { EIP712Domain } from "./libs/EIP712Domain.sol";
import { EIP3009 } from "./libs/EIP3009.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract TravelPonziCoin is EIP712Domain, EIP3009, Ownable  {
    Avatar avatarContract;
    address private _owner;

    constructor(uint256 initialSupply) public ERC20("TravelPonziCoin", "TPC") {
        _mint(msg.sender, initialSupply);
        _owner = msg.sender;
        DOMAIN_SEPARATOR = EIP712.makeDomainSeparator("TravelPonziCoin", "1");
    }
    
    modifier onlyAvatarContract {
        require(
            msg.sender == address(avatarContract),
            "Only the avatar contract can call this function."
        );
        _;
    }

    function generateTokensNewUser(address user) public onlyAvatarContract{
     _mint(user, 100);  
     
    }
     
    function setAvatarContract(address avatarAddress) public onlyOwner{
       avatarContract = Avatar(avatarAddress);
    }
    
    function tipUser(address _to, string memory category, uint256 value) public{
        super.transfer(_to, value);
        avatarContract.sendTip(category, _to, value);
    }

}