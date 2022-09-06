import ethers from "ethers";

export const initWeb3 = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  let ethereum = (window as any).ethereum;
  //   let windowWeb3 = (window as any).web3;
  // New metamask version
  if (typeof ethereum !== "undefined") {
    await provider.send("eth_requestAccounts", []);
  }
  return provider;
};
