// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

struct PersonalInfo {
    string name;
    string phone;
    string addr;
}

struct Item {
    string name;
    PersonalInfo sender;
    PersonalInfo reciever;
    uint256 id;
}


struct Station {
    string name;
    string addr;
    uint256 id;
}

contract Transport {
    mapping(uint256 => uint256) itemIdToOrderId;
    
    function _itemToString()

    function _getItemId(Item item) internal pure returns(string memory) {
        return sha256(
        )
    }

    function sendItem(
        string senderName,
        string senderPhone,
        string senderAddr,
        string recieverName,
        string recieverPhone,
        string recieverAddr,
        string itemName,
        uint256 startStation,
    ) public {
        
    }
}
