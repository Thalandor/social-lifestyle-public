import { AvatarABI, AvatarContractAddress } from "../components/config/contractInfo";
import { initWeb3 } from "../utils/web3Utils";



export const getPicture = async () => {
  const web3 = await initWeb3();
  if (web3) {
    //https://ipfs.io/ipfs/QmbpdtiSDir4xEXR5F6VMcFwb9wfyys9v6JpNz8kPAteqW?filename=avatar_default_uri.json test information
    // 0x4668b4459fAEbA07606E0bc829E12646294Ec8C1  Ropsten contract
    const addresses = await web3.eth.getAccounts();
    const myAddress = addresses[0];
    const avatarContract = new web3.eth.Contract(
      AvatarABI,
      AvatarContractAddress
    );
    const numberOfTokens = await avatarContract.methods
      .balanceOf(myAddress)
      .call();
    if (numberOfTokens > 0) {
      const tokenId = await avatarContract.methods
        .tokenOfOwnerByIndex(myAddress, 0)
        .call();
      const tokenURI = await avatarContract.methods.tokenURI(tokenId).call();
      const response = await fetch(tokenURI);
      const ipfsJson = await response.json();
      return ipfsJson.image;
    } else {
      console.error("no tokens on this address");
    }
  }
};


export const getTokensByCategory = async (category: string) => {
  const web3 = await initWeb3();
  if (web3) {
    //https://ipfs.io/ipfs/QmbpdtiSDir4xEXR5F6VMcFwb9wfyys9v6JpNz8kPAteqW?filename=avatar_default_uri.json test information
    // 0x4668b4459fAEbA07606E0bc829E12646294Ec8C1  Ropsten contract
    const addresses = await web3.eth.getAccounts();
    const myAddress = addresses[0];
    const avatarContract = new web3.eth.Contract(
      AvatarABI,
      AvatarContractAddress
    );
    const tokens = await avatarContract.methods.getTokensByCategory(myAddress, category).call(); 
    return tokens;
  }
}