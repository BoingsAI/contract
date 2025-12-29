// @ts-nocheck
import { ethers } from "hardhat";
import {BigNumberish} from "ethers";

async function main() {


    const [owner] = await ethers.getSigners();

    const ERC20Factory = await ethers.getContractFactory('ERC20FixedAutoVote')
    const erc20 = await ERC20Factory.deploy(
        "boing",
        "BOING",
        10000000,
        owner.address,
        18)
    let balance = await erc20.balanceOf(owner.address)
    console.log("--------- balance",balance.toString());



    const CheckInFactory = await ethers.getContractFactory('CheckIn')
    const checkIn = await CheckInFactory.deploy()

    let tx = await checkIn.checkIn()
    console.log("check in hash",tx.hash);

}

main();
