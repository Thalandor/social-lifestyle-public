var TipService = require("../services/tip-services");
const Web3 = require("web3");
const ContractInfo = require("../contracts/contractsInfo");
// Used in a future with metatransactions
exports.tipUser = async function (req, res, next) {
  try {
    const { to, from, amount, transaction, signature } = req.body;
    const result = await TipService.storeTip({
      to,
      from,
      amount,
      transaction,
      signature,
    });
    return res
      .status(200)
      .json({ status: 200, data: users, message: "Meta transaction done" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.tipMetaTransaction = async function (req, res) {
  try {
    const {
      from,
      to,
      amount,
      nonce,
      validBefore,
      validAfter,
      v,
      r,
      s,
    } = req.body;
    const web3 = new Web3(
      // Put here your ws provider
      new Web3.providers.WebsocketProvider("")
    );

    // Put here the private key that deploys the contracts
    const privateKey = "";
    const account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;
    const tokenContract = new web3.eth.Contract(
      ContractInfo.TravelPonziCoinABI,
      ContractInfo.TravelPonziCoinContractAddress
    );
    const gasPrice = await web3.eth.getGasPrice();
    const gasEstimate = await tokenContract.methods
      .transferWithAuthorization(
        from,
        to,
        amount,
        validAfter,
        validBefore,
        nonce,
        v,
        r,
        s
      )
      .estimateGas({ from: account.address });
    const result = await tokenContract.methods
      .transferWithAuthorization(
        from,
        to,
        amount,
        validAfter,
        validBefore,
        nonce,
        v,
        r,
        s
      )
      .send({ from: account.address, gasPrice: gasPrice, gas: gasEstimate });
    return res.json(result);
  } catch (e) {
    console.log("error?: :", e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};
