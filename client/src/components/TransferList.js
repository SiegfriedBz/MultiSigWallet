import React from "react"
import Transfer from "./Transfer"

const TransferList = ({
  account,
  quorum,
  balance,
  transfers,
  isApprover,
  onApproveTransfer,
}) => {
  return (
    <div className='my-3'>
      <table className='table align-middle'>
        <thead>
          <tr className='text-center'>
            <th scope='col'>Transfer Id</th>
            <th scope='col'>Recipient</th>
            <th scope='col'>Amount - ETH</th>
            <th scope='col'>Approvals Count</th>
            <th scope='col'>Status</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {transfers &&
            transfers.map((transfer) => {
              const transferId = transfer.id.toNumber()
              return (
                <Transfer
                  key={transferId}
                  account={account}
                  quorum={quorum}
                  balance={balance}
                  transfer={transfer}
                  isApprover={isApprover}
                  onApproveTransfer={onApproveTransfer}
                />
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default TransferList
