import {
  AvatarABI,
  AvatarContractAddress,
} from "../components/config/contractInfo";
import { initWeb3 } from "../utils/web3Utils";
import { Avatar__factory } from "blockchain/typechain-types/index";
import { ethers } from "ethers";

export const getPicture = async () => {
  const provider = await initWeb3();
  if (provider) {
    //https://ipfs.io/ipfs/QmbpdtiSDir4xEXR5F6VMcFwb9wfyys9v6JpNz8kPAteqW?filename=avatar_default_uri.json test information
    // 0x4668b4459fAEbA07606E0bc829E12646294Ec8C1  Ropsten contract
    const avatarContract = new ethers.Contract(
      AvatarContractAddress,
      Avatar__factory.abi,
      provider
    );

    const signer = provider.getSigner();
    const currentAddress = await signer.getAddress();
    const numberOfTokens = await avatarContract.balanceOf(currentAddress);
    if (numberOfTokens > 0) {
      const tokenId = await avatarContract.tokenOfOwnerByIndex(
        currentAddress,
        0
      );
      const tokenURI = await avatarContract.tokenURI(tokenId);
      const response = await fetch(tokenURI);
      const ipfsJson = await response.json();
      return ipfsJson.image;
    } else {
      console.error("no tokens on this address");
    }
  }
};

export const getTokensByCategory = async (category: string) => {
  const provider = await initWeb3();
  if (provider) {
    //https://ipfs.io/ipfs/QmbpdtiSDir4xEXR5F6VMcFwb9wfyys9v6JpNz8kPAteqW?filename=avatar_default_uri.json test information
    // 0x4668b4459fAEbA07606E0bc829E12646294Ec8C1  Ropsten contract
    const signer = provider.getSigner();
    const currentAddress = await signer.getAddress();
    const avatarContract = new ethers.Contract(
      AvatarContractAddress,
      Avatar__factory.abi,
      provider
    );
    const tokens = await avatarContract.getTokensByCategory(
      currentAddress,
      category
    );
    return tokens;
  }
};
