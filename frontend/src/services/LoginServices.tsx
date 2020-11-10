import { initWeb3 } from "../utils/web3Utils";
import axios from "axios";
import { bufferToHex } from "ethereumjs-util";

export const getUserInfo = async (publicAddress: string) => {
  const response = await axios.get("http://localhost:3001/users", {
    params: { publicAddress },
  });
  return response.data[0];
};

export const login = async (
  signature: string,
  publicAddress: string
): Promise<string> => {
  const response = await axios.post("http://localhost:3001/login", {
    signature,
    publicAddress,
  });
  return response.data;
};

export const register = async (publicAddress: string, username: string) => {
  const response = await axios.post("http://localhost:3001/register", {
    publicAddress,
    username
  });
}

export const signMessage = async (msg: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    var hexMsg = bufferToHex(new Buffer(msg, "utf8"));
    const web3 = await initWeb3();
    if (web3) {
      const accounts = await web3.eth.getAccounts();
      const currentAccount = accounts[0];
      const params = [hexMsg, currentAccount];
      // Web3.js doesn't provide a personal_sign method for now, until community decided the final implementation
      // that's why we have to call directly the function provided by the provider (metamask on this case)
      const method = "personal_sign";
      (web3.currentProvider as any).sendAsync(
        {
          method,
          params,
          currentAccount,
        },
        function (err: any, result: any) {
          if (err) return reject(err);
          if (result.error) return reject(result.error);
          return resolve(result.result);
        }
      );
    }
  });
};
