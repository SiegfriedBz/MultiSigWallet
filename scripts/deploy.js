const hre = require("hardhat")

async function main() {
  const MultiSig = await hre.ethers.getContractFactory("MultiSig")
  const contract = await MultiSig.deploy(
    [
      "0x8de905283f3c93b0fb4FA34CA8024Ea59e81e436",
      "0xBD81a7e97fb314FAC9978a4747c93Fb2F93094e0",
      "0x0b8043d952f8C21eB024C5b1F397E20770194d62",
    ], // _approvers
    2 // _quorum
  )

  await contract.deployed()

  console.log("MultiSig deployed to:", contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
