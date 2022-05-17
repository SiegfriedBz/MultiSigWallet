import React, { useState } from "react"

const RequestTransfer = ({ onRequestTransfer }) => {
  const [transfer, setTransfer] = useState({ recipient: "", amount: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onRequestTransfer(transfer)
    setTransfer({ recipient: "", amount: "" })
  }

  return (
    <form onSubmit={handleSubmit} className='my-3'>
      <div className='d-flex justify-content-center'>
        <div className='d-flex flex-column ms-2 align-items-center'>
          <label htmlFor='recipient' className='form-label fw-bold'>
            Recipient
          </label>
          <input
            id='recipient'
            className='form-control'
            value={transfer.recipient}
            onChange={(e) => {
              setTransfer({ ...transfer, [e.target.id]: e.target.value })
            }}
          ></input>
        </div>
        <div className='d-flex flex-column ms-2 align-items-center'>
          <label htmlFor='amount' className='form-label fw-bold'>
            Amount
          </label>
          <input
            id='amount'
            className='form-control'
            value={transfer.amount}
            onChange={(e) => {
              setTransfer({ ...transfer, [e.target.id]: e.target.value })
            }}
          ></input>
        </div>
      </div>
      <div className='d-flex justify-content-center mt-1'>
        <button type='submit' className='btn btn-primary btn-sm'>
          Create Transfer Request
        </button>
      </div>
    </form>
  )
}

export default RequestTransfer
