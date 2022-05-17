import React, { useState } from "react"

const AddApprover = ({ onAddApprover }) => {
  const [approver, setApprover] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onAddApprover(approver)
    setApprover("")
  }

  return (
    <div className='d-flex flex-column align-items-center my-3'>
      <form onSubmit={handleSubmit}>
        <label className='d-flex justify-content-around form-label fw-bold'>
          Add Approver
        </label>
        <input
          className='form-control'
          value={approver}
          onChange={(e) => {
            setApprover(e.target.value)
          }}
        ></input>
        <div className='d-flex justify-content-around mt-1'>
          <button type='submit' className='btn btn-primary btn-sm'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddApprover
