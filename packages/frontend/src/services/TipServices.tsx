import { initWeb3 } from "../utils/web3Utils";
import axios from "axios";
import { TravelPonziCoinContractAddress } from "../components/config/contractInfo";

export interface ISignature {
  validBefore: number;
  validAfter: number;
  nonce: string;
  signature: string;
  v: string;
  r: string;
  s: string;
}
export const signMetatransaction = async (
  to: string,
  amount: number
): Promise<ISignature> => {
  return new Promise(async (resolve, reject) => {
    const web3 = await initWeb3();
    if (web3) {
      // const accounts = await web3.eth.getAccounts();
      // const currentAccount = accounts[0];
      // const chainId = await web3.eth.getChainId();
      // const validBefore = Math.floor(Date.now() / 1000) + 3600;
      // const validAfter = 0;
      // const nonce = web3.utils.randomHex(32);
      // const checksumedAddress = web3.utils.toChecksumAddress(currentAccount);
      // const data = {
      //   types: {
      //     EIP712Domain: [
      //       { name: "name", type: "string" },
      //       { name: "version", type: "string" },
      //       { name: "verifyingContract", type: "address" },
      //       { name: "chainId", type: "uint256" },
      //     ],
      //     TransferWithAuthorization: [
      //       { name: "from", type: "address" },
      //       { name: "to", type: "address" },
      //       { name: "value", type: "uint256" },
      //       { name: "validAfter", type: "uint256" },
      //       { name: "validBefore", type: "uint256" },
      //       { name: "nonce", type: "bytes32" },
      //     ],
      //   },
      //   domain: {
      //     name: "TravelPonziCoin",
      //     version: "1",
      //     verifyingContract: TravelPonziCoinContractAddress,
      //     chainId: chainId,
      //   },
      //   primaryType: "TransferWithAuthorization",
      //   message: {
      //     from: checksumedAddress,
      //     to: to,
      //     value: amount.toString(), //amountBN.toString(10),
      //     validAfter: validAfter,
      //     validBefore: validBefore, // Valid for an hour
      //     nonce: nonce,
      //   },
      // };
      // const params = [checksumedAddress, JSON.stringify(data)];
      // const method = "eth_signTypedData_v4";
      // (web3.currentProvider as any).sendAsync(
      //   {
      //     method,
      //     params,
      //     checksumedAddress,
      //   },
      //   function (err: any, result: any) {
      //     if (err) return reject(err);
      //     if (result.error) return reject(result.error);
      //     const signature = result.result;
      //     const v = "0x" + signature.slice(130, 132);
      //     const r = signature.slice(0, 66);
      //     const s = "0x" + signature.slice(66, 130);
      //     return resolve({
      //       validBefore,
      //       validAfter,
      //       nonce,
      //       signature,
      //       v,
      //       r,
      //       s,
      //     });
      //   }
      // );
    }
  });
};

export const tipUserMetaTransaction = async (
  to: string,
  amount: string,
  signature: ISignature
) => {
  const web3 = await initWeb3();
  if (web3) {
    // const accounts = await web3.eth.getAccounts();
    // const currentAccount = accounts[0];
    // const response = await axios.post("http://localhost:3001/tipMeta", {
    //   from: web3.utils.toChecksumAddress(currentAccount),
    //   to,
    //   amount,
    //   ...signature,
    // });
    // return response.data;
  }
};
