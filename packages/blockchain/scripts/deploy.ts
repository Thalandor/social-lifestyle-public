import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
  ethers.utils.AbiCoder
  const lockedAmount = ethers.utils.parseEther("1");

  const Avatar = await ethers.getContractFactory("Avatar");
  const TravelPonziCoin = await ethers.getContractFactory("TravelPonziCoin");
  const travelPonziCoin = await TravelPonziCoin.deploy(30000);
  const avatar = await Avatar.deploy();
  await travelPonziCoin.deployed();
  await avatar.deployed();


  console.log("TravelPonziCoin Contract deployed to:", travelPonziCoin.address);
  console.log("TravelPonziCoin Contract deployed to", avatar.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
