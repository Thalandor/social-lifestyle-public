import axios from 'axios';
import { initWeb3 } from "../utils/web3Utils";
import { TravelPonziCoinABI, TravelPonziCoinContractAddress } from "../components/config/contractInfo";


export const getAll = async () => {
    const response = await axios.get("/feeds");
    return response.data;
}

export const getUserAccount = async() => {
    const web3 = await initWeb3();
    if (web3) {
        const accounts = await web3.eth.getAccounts();
        const userAccount = accounts[0];
        return userAccount;
    } else {
        console.log("not user account detected")
    }
} 

export const create = async(data: any) => {
    const response = await axios.post("/feed", data);
    return response.data;
}

export const sendTip = async(feedCreator: string, category: string, amount: number) => {
    const web3 = await initWeb3();
    if(web3) {
        const tokenContract = new web3.eth.Contract(
            TravelPonziCoinABI,
            TravelPonziCoinContractAddress
        );
        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];
        const gasPrice = await web3.eth.getGasPrice();
        const gasEstimate = await tokenContract.methods.tipUser(feedCreator, category, amount).estimateGas({ from: currentAccount });
        await tokenContract.methods.tipUser(feedCreator, category, amount).send({ from: currentAccount , gasPrice: gasPrice, gas: gasEstimate});;
    }     
}

export default {
    getAll,
    getUserAccount,
    create,
    sendTip
};