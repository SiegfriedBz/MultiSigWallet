import React, { useState } from "react"

const Deposit = ({ onDeposit }) => {
  const [amount, setAmount] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onDeposit(amount)
    setAmount("")
  }

  return (
    <div className='d-flex flex-column align-items-center my-3'>
      <form onSubmit={handleSubmit}>
        <label className='d-flex justify-content-around form-label fw-bold'>
          Deposit
        </label>
        <input
          className='form-control'
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value)
          }}
        ></input>
        <div className='d-flex justify-content-around'>
          <button type='submit' className='btn btn-primary btn-sm mt-1'>
            Send ETH
          </button>
        </div>
      </form>
    </div>
  )
}

export default Deposit
