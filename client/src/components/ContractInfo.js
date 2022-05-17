import React from "react"
import { spinner } from "../helpers/loadingSpinner"

const ContractInfo = ({ balance, quorum, requestCounter }) => {
  const transferText = () => {
    return requestCounter <= 1 ? "Number of Transfer" : "Number of Transfers"
  }

  return (
    <div className='d-flex flex-column align-items-center mt-3'>
      <div className='d-flex fw-bold fs-5 mt-1'>Balance</div>
      <div className='d-flex'>
        {!balance ? (
          spinner("blue")
        ) : (
          <span className='badge bg-primary fs-5'>{balance} ether</span>
        )}
      </div>
      <div className='d-flex fw-bold mt-1'>Quorum</div>
      <div className='d-flex'>{!quorum ? spinner("blue") : `${quorum}`}</div>
      <div className='d-flex fw-bold mt-1'>{transferText()}</div>
      <div className='d-flex'>
        {typeof requestCounter == "undefined"
          ? spinner("blue")
          : `${requestCounter}`}
      </div>
    </div>
  )
}

export default ContractInfo
