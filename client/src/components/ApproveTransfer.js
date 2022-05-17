const ApproveTransfer = ({
  transfer,
  onApproveTransfer,
  transferIsApprovedByUser,
  quorumReached,
}) => {
  const transferId = transfer.id

  const buttonClass = () => {
    return quorumReached()
      ? "btn btn-success btn-sm"
      : transferIsApprovedByUser
      ? "btn btn-warning btn-sm"
      : "btn btn-primary btn-sm"
  }
  const buttonText = () => {
    return quorumReached()
      ? "Send Transfer"
      : transferIsApprovedByUser
      ? "Wait for more approvals"
      : "Approve"
  }

  return (
    <div className='text-center'>
      <button
        onClick={() => {
          onApproveTransfer(transferId)
        }}
        className={buttonClass()}
      >
        {buttonText()}
      </button>
    </div>
  )
}

export default ApproveTransfer
