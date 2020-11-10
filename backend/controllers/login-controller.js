const ethereumjsUtils = require("ethereumjs-util");
const ethSigUtils = require("eth-sig-util");
const jwt = require("jsonwebtoken");
const Web3 = require("web3");
const ContractInfo = require("../contracts/contractsInfo");

var UserService = require("../services/user-services");

exports.register = async (req, res) => {
  const { publicAddress, username } = req.body;
  const user = await UserService.getUser({ publicAddress });
  if (user && user.publicAddress) {
    // user already exists, send error message
  } else {
    const nonce = Math.floor(Math.random() * 10000);
    const newUser = UserService.createUser({ publicAddress, username, nonce });
    const web3 = new Web3(
      // Put here your web socket provider
      new Web3.providers.WebsocketProvider("")
    );
    // Put here your private key
    const privateKey = "";
    const account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;
    const avatarContract = new web3.eth.Contract(
      ContractInfo.AvatarABI,
      ContractInfo.AvatarContractAddress
    );
    const gasPrice = await web3.eth.getGasPrice();
    const gasEstimate = await avatarContract.methods
      .createAvatar(
        "https://ipfs.io/ipfs/QmbpdtiSDir4xEXR5F6VMcFwb9wfyys9v6JpNz8kPAteqW?filename=avatar_default_uri.json",
        publicAddress
      )
      .estimateGas({ from: account.address });
    await avatarContract.methods
      .createAvatar(
        "https://ipfs.io/ipfs/QmbpdtiSDir4xEXR5F6VMcFwb9wfyys9v6JpNz8kPAteqW?filename=avatar_default_uri.json",
        publicAddress
      )
      .send({ from: account.address, gasPrice: gasPrice, gas: gasEstimate });
    // Return ok

    return res.status(200).json({ message: "User registered" });
  }
};

exports.login = async (req, res) => {
  const { signature, publicAddress } = req.body;
  if (signature && publicAddress) {
    const user = await UserService.getUser({ publicAddress });
    const msg = `I am signing my one-time nonce: ${user.nonce}`;

    // We now are in possession of msg, publicAddress and signature. We
    // will use a helper from eth-sig-util to extract the address from the signature
    const msgBufferHex = ethereumjsUtils.bufferToHex(Buffer.from(msg, "utf8"));
    const extractedAddress = ethSigUtils.recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });
    // Check to know if the address signed the message correctly
    if (publicAddress.toLowerCase() === extractedAddress.toLowerCase()) {
      // Login correct, we need to generate a new nonce and save it
      user.nonce = Math.floor(Math.random() * 10000);
      await user.save();
      // Return a new jwt
      const jwtToken = jwt.sign(
        {
          payload: {
            id: user.id,
            publicAddress,
          },
        },
        // Put here your random secret generated with node -e "console.log(require('crypto').randomBytes(256).toString('base64'))";
        "",
        {}
      );
      res.json(jwtToken);
    } else {
      // Address are different, signature incorrect
      console.error("Addresses are different");
    }
  } else {
    // parameters not received correctly
    console.error("Parameters not received correctly");
  }
};
