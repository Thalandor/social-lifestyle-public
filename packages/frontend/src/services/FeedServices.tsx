import axios from "axios";
import { initWeb3 } from "../utils/web3Utils";
import {
  TravelPonziCoinABI,
  TravelPonziCoinContractAddress,
} from "../components/config/contractInfo";
import { TravelPonziCoin__factory } from "blockchain/typechain-types";
import { ethers } from "ethers";

export const getAll = async () => {
  const response = await axios.get("/feeds");
  return response.data;
};

export const getUserAccount = async () => {
  const provider = await initWeb3();
  if (provider) {
    const signer = provider.getSigner();
    const userAccount = await signer.getAddress();
    return userAccount;
  } else {
    console.log("not user account detected");
  }
};

export const create = async (data: any) => {
  const response = await axios.post("/feed", data);
  return response.data;
};

export const sendTip = async (
  feedCreator: string,
  category: string,
  amount: number
) => {
  const provider = await initWeb3();
  if (provider) {
    const tokenContract = new ethers.Contract(
      TravelPonziCoinContractAddress,
      TravelPonziCoin__factory.abi,
      provider.getSigner()
    );
    await tokenContract.tipUser(feedCreator, category, amount);
  }
};

const FeedServices = {
  getAll,
  getUserAccount,
  create,
  sendTip,
};
export default FeedServices;
