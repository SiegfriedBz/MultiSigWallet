import { ethers } from "ethers"
import contractArtifact from "../artifacts/contracts/MultiSig.sol/MultiSig.json"
const contractAddress = "0x3F9BF0796B3c946db051F06b3c89F7363fc46a52"
const contractABI = contractArtifact.abi

export const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contract = new ethers.Contract(contractAddress, contractABI, provider)
  return contract
}
export const getContractWithS = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contractWithS = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )
  return contractWithS
}
