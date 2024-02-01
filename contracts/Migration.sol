pragma solidity >=0.4.22 <0.9.0;

contract Migration {
    address public owner = msg.sender;
    uint public last_completed_migration;

    modifier resricted() {
        require (owner== msg.sender,"This funtion restricted to the owner");
        _;
    }

    function setCompleted(uint completed)  public resricted {
        last_completed_migration=completed;
    }


}
