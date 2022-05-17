//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract MultiSig {

    uint256 public quorum;
    struct Transfer {
        uint256 id;
        uint256 amount;
        uint256 approvalsCount;
        address payable recipient;
        bool sent;
    }
    uint256 public nextId;
    mapping(uint256 => Transfer) public idToTransfer;
    mapping(address => bool) public approvers;
    mapping(address => mapping(uint256 => bool)) public approverToTransferApproval;

    modifier OnlyApprover(address _address){
        require(approvers[_address] == true, "Only Approver Access");
        _;
    }

    constructor(address[] memory _approvers, uint256 _quorum) {
        for(uint256 i=0; i<_approvers.length; i++) {
            approvers[_approvers[i]] = true;
        }
        quorum = _quorum;
    }

    // Deposit + getBalance from any address
    function deposit() payable external {}
    function getBalance() external view returns(uint256){
        return address(this).balance;
    }

    // Add Approverfrom OnlyApprover
    function addApprover(address _newApprover) external OnlyApprover(msg.sender) {
        approvers[_newApprover] = true;
    }

    // Request Transfer from OnlyApprover
    function requestTransfer(address payable _recipient, uint256 _amount) external OnlyApprover(msg.sender) {
        require(_recipient != address(0), "Burn not allowed");
        idToTransfer[nextId] = Transfer(
            nextId,
            _amount,
            0,
            _recipient,
            false
        );
        nextId++;
    }

    // ApproveOrSend Transfer from OnlyApprover
    function approveOrSendTransfer(uint256 _id) payable external OnlyApprover(msg.sender) {
        Transfer storage transfer = idToTransfer[_id];
        require(transfer.recipient != address(0), 'Transfer does not exist');
        require(transfer.sent == false, 'Transfer already executed');
        if(transfer.approvalsCount >= quorum) {
            require(transfer.amount <= address(this).balance, "Contract Balance too low");
            transfer.sent = true;
            (transfer.recipient).transfer(transfer.amount);
            return;
        }
        if(approverToTransferApproval[msg.sender][_id] == false) {
            approverToTransferApproval[msg.sender][_id] = true;
            transfer.approvalsCount++;
        }
    }
}

