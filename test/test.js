const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("MultiSig", function () {
  let contract
  let signer1, signer2
  let prov = ethers.provider // Local HardHat Provider
  let trx

  beforeEach(async () => {
    // Get Signers
    ;[_, signer1, signer2] = await ethers.getSigners()

    const MultiSig = await hre.ethers.getContractFactory("MultiSig")
    contract = await MultiSig.deploy()

    await contract.deployed()
    console.log("MultiSig deployed to:", contract.address)
  })

  describe("MultiSig - ", () => {
    it("Should allow ", async function () {})
    it("Should NOT allow  - Unhappy Path", async function () {})
  })
})
