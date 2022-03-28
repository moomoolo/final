// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;


enum ActionType {
    START,
    RECIEVE,
    SEND,
    END
}

struct OrderAction {
    ActionType action;
    uint256 from;
    uint256 to;
    address operator;
    uint256 time;
}

struct Order {
    bytes32 fromStation;
    bytes32 toStation;
    string fromAddress;
    string toAddress;
    string senderName;
    string senderPhone;
    string recieverName;
    string recieverPhone;
    uint256 createTime;
    bytes32 hash;
}

contract Transport {
    mapping (bytes32 => Order) hashToOrder;
    // 手机号查询订单
    mapping (string => Order[]) phoneToOrder;

    event NewOrder(bytes32 hash);

    event TestEvent(uint256 res);
    function createOrder(
        bytes32 fromStation,
        bytes32 toStation,
        string memory fromAddress,
        string memory toAddress,
        string memory senderName,
        string memory senderPhone,
        string memory recieverName,
        string memory recieverPhone
    ) public {
        // 新建订单
        emit TestEvent(0x55);
        Order memory order = Order(
            fromStation,
            toStation,
            fromAddress,
            toAddress,
            senderName,
            senderPhone,
            recieverName,
            recieverPhone,
            block.timestamp,
            '0'
        );

        bytes32 orderHash = keccak256(abi.encode(
            fromStation,
            toStation,
            fromAddress,
            toAddress,
            senderName,
            senderPhone,
            recieverName,
            recieverPhone,
            block.timestamp
        ));

        order.hash = orderHash;

        hashToOrder[orderHash] = order;
        phoneToOrder[senderPhone].push(order);
        phoneToOrder[recieverPhone].push(order);
        // TODO: 插入链表

        emit NewOrder(orderHash);
    }

    function getOrderInfoByHash(
        bytes32 hash
    ) public view returns (
        bytes32 fromStation,
        bytes32 toStation,
        string memory fromAddress,
        string memory toAddress,
        string memory senderName,
        string memory senderPhone,
        string memory recieverName,
        string memory recieverPhone,
        uint256 createTime
    ) {
        Order memory order = hashToOrder[hash];

        return (
            order.fromStation,
            order.toStation,
            order.fromAddress,
            order.toAddress,
            order.senderName,
            order.senderPhone,
            order.recieverName,
            order.recieverPhone,
            order.createTime
        );
    }
}
