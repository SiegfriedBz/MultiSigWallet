import { useState, useEffect } from "react"
import { ethers } from "ethers"
import ApproveTransfer from "./ApproveTransfer"
import { getContract } from "../helpers/contractConfig"

const Transfer = ({
  account,
  quorum,
  balance,
  transfer,
  isApprover,
  onApproveTransfer,
}) => {
  const transferId = transfer.id.toNumber()
  const recipient = transfer.recipient
  const amount = ethers.utils.formatEther(transfer.amount)
  const approvalsCount = parseInt(transfer.approvalsCount)

  const [transferIsApprovedByUser, setTransferIsApprovedByUser] =
    useState(undefined)

  useEffect(() => {
    ;(async () => {
      const transferIsApprovedByUser = await checkIfTransferIsApprovedByUser(
        account,
        transferId
      )
      setTransferIsApprovedByUser(transferIsApprovedByUser)
    })()
  }, [transfer])

  const checkIfTransferIsApprovedByUser = async (account, transferId) => {
    // mapping(address => mapping(uint256 => bool)) public approverToTransferApproval;
    const contract = getContract()
    let transferIsApprovedByUser = await contract.approverToTransferApproval(
      account,
      transferId
    )
    return transferIsApprovedByUser
  }

  const transferIsActive = () => {
    return !transfer.sent
  }

  const quorumReached = () => {
    return approvalsCount >= quorum
  }

  const amountClass = () => {
    return balance < amount ? "badge bg-warning" : "badge bg-primary"
  }
  const approvalsClass = () => {
    return quorumReached() ? "badge bg-success" : "badge bg-primary"
  }
  const statusClass = () => {
    return transferIsActive() ? "badge bg-primary" : "badge bg-success"
  }
  const statusText = () => {
    return transferIsActive() ? "Active" : "Sent"
  }

  return (
    <tr className='text-center'>
      <th scope='row'>{transferId}</th>
      <td>{`${recipient.slice(0, 4)}...${recipient.slice(38, 42)}`}</td>
      <td>
        <span className={amountClass()}>{amount}</span>
      </td>
      <td>
        <span className={approvalsClass()}>{approvalsCount}</span>
      </td>
      <td>
        <span className={statusClass()}>{statusText()}</span>
      </td>
      <td>
        {isApprover && transferIsActive() && (
          <ApproveTransfer
            transfer={transfer}
            onApproveTransfer={onApproveTransfer}
            transferIsApprovedByUser={transferIsApprovedByUser}
            quorumReached={quorumReached}
          />
        )}
      </td>
    </tr>
  )
}

export default Transfer
