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
    uint256 fromStation;
    uint256 toStation;
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

    function createOrder(
        uint256 fromStation,
        uint256 toStation,
        string memory fromAddress,
        string memory toAddress,
        string memory senderName,
        string memory senderPhone,
        string memory recieverName,
        string memory recieverPhone
    ) public {
        // 新建订单
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

        phoneToOrder[senderPhone].push(order);
        phoneToOrder[recieverPhone].push(order);
        // TODO: 插入链表
    }


    // 通过号码查询订单列表
    // 获取收发站点信息
    function getOrderStationInfoListByPhone(
        string calldata phone
    ) public view returns (
        uint256[] memory,
        uint256[] memory,
        string[] memory,
        string[] memory
    ) {
        Order[] memory orders = phoneToOrder[phone];
        uint length = orders.length;
        
        uint256[] memory fromStation = new uint256[](length);
        uint256[] memory toStation = new uint256[](length);
        string[] memory fromAddress = new string[](length);
        string[] memory toAddress = new string[](length);

        for (uint i = 0; i < length; i++) {
            Order memory order = orders[i];
            fromStation[i] = order.fromStation;
            toStation[i] = order.toStation;
            fromAddress[i] = order.fromAddress;
            toAddress[i] = order.toAddress;
        }

        return (
            fromStation,
            toStation,
            fromAddress,
            toAddress
        );
    }

    // 获取收发人员信息
    function getOrderPeopleInfoListByPhone(
        string calldata phone
    ) public view returns (
        string[] memory,
        string[] memory,
        string[] memory,
        string[] memory
    ) {
        Order[] memory orders = phoneToOrder[phone];
        uint length = orders.length;

        string[] memory senderName = new string[](length);
        string[] memory senderPhone = new string[](length);
        string[] memory recieverName = new string[](length);
        string[] memory recieverPhone = new string[](length);

        for (uint i = 0; i < length; i++) {
            Order memory order = orders[i];
            senderName[i] = order.senderName;
            senderPhone[i] = order.senderPhone;
            recieverName[i] = order.recieverName;
            recieverPhone[i] = order.recieverPhone;
        }

        return (
            senderName,
            senderPhone,
            recieverName,
            recieverPhone
        );
    }

    // 获取其他信息
    function getOrderOtherInfoListByPhone(
        string calldata phone
    ) public view returns (
        uint256[] memory,
        bytes32[] memory
    ) {
        Order[] memory orders = phoneToOrder[phone];
        uint length = orders.length;

        uint256[] memory createTime = new uint256[](length);
        bytes32[] memory hash = new bytes32[](length);

        for (uint i = 0; i < length; i++) {
            Order memory order = orders[i];
            createTime[i] = order.createTime;
            hash[i] = order.hash;
        }
        return (
            createTime,
            hash
        );
    }

}
