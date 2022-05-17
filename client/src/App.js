import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { connect } from "./helpers/connect"
import { getContract, getContractWithS } from "./helpers/contractConfig"
import Banner from "./components/Banner"
import ContractInfo from "./components/ContractInfo"
import Deposit from "./components/Deposit"
import AddApprover from "./components/AddApprover"
import RequestTransfer from "./components/RequestTransfer"
import TransferList from "./components/TransferList"

function App() {
  const [account, setAccount] = useState("")
  const [contract, setContract] = useState("")
  const [contractWithS, setContractWithS] = useState("")
  const [balance, setBalance] = useState("")
  const [quorum, setQuorum] = useState("")
  const [transfers, setTransfers] = useState([])
  const [requestCounter, setRequestCounter] = useState(undefined)
  const [isApprover, setIsApprover] = useState(undefined)

  useEffect(() => {
    ;(async () => {
      const account = await connect()
      const contract = getContract()
      const contractWithS = getContractWithS()
      setAccount(account)
      setContract(contract)
      setContractWithS(contractWithS)
    })()
  }, [account])

  useEffect(() => {
    if (contract && account) {
      ;(async () => {
        const quorum = await contract.quorum()
        setQuorum(parseInt(quorum))
        await refreshRequestCounter()
        await refreshBalance()
        await checkIfApprover()
      })()
    }
  }, [contract])

  useEffect(() => {
    if (contract) {
      ;(async () => {
        await getTransfers()
      })()
    }
  }, [contract, requestCounter])

  const refreshBalance = async () => {
    const bal = await contract.getBalance()
    setBalance(ethers.utils.formatEther(bal))
  }

  const refreshRequestCounter = async () => {
    const nextId = await contract.nextId()
    setRequestCounter(parseInt(nextId))
  }

  const checkIfApprover = async () => {
    let isApprover = await contract.approvers(account)
    setIsApprover(isApprover)
  }

  const onDeposit = async (amount) => {
    let trx = await contractWithS.deposit({
      value: ethers.utils.parseEther(amount),
      gasLimit: 3000000,
    })
    await trx.wait()
    await refreshBalance()
  }

  const onAddApprover = async (address) => {
    let trx = await contractWithS.addApprover(address, {
      gasLimit: 3000000,
    })
    await trx.wait()
    await checkIfApprover()
  }

  const getTransfers = async () => {
    const transfers = []
    for (let i = 0; i < requestCounter; i++) {
      const transfer = await Promise.all([contract.idToTransfer(i)])
      transfers.push(...transfer)
    }
    setTransfers(transfers)
  }

  const onRequestTransfer = async (transfer) => {
    const { recipient, amount } = transfer
    let trx = await contractWithS.requestTransfer(
      recipient,
      ethers.utils.parseEther(amount),
      {
        gasLimit: 3000000,
      }
    )
    await trx.wait()
    await refreshRequestCounter()
  }

  const onApproveTransfer = async (id) => {
    let trx = await contractWithS.approveOrSendTransfer(id, {
      gasLimit: 3000000,
    })
    await trx.wait()
    await getTransfers()
  }

  return (
    <div>
      <Banner account={account} isApprover={isApprover} />
      <div className='container'>
        <ContractInfo
          balance={balance}
          quorum={quorum}
          requestCounter={requestCounter}
        />
        <Deposit onDeposit={onDeposit} />
        {isApprover && <AddApprover onAddApprover={onAddApprover} />}
        {isApprover && (
          <RequestTransfer onRequestTransfer={onRequestTransfer} />
        )}
        <TransferList
          account={account}
          quorum={quorum}
          balance={balance}
          transfers={transfers}
          isApprover={isApprover}
          onApproveTransfer={onApproveTransfer}
        />
      </div>
    </div>
  )
}

export default App
