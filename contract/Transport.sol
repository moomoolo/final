// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;


enum ActionType {
    START,
    RECIEVE,
    SEND,
    DELIVER,
    END
}

struct OrderAction {
    ActionType action;
    bytes32 from;
    bytes32 to;
    address operator;
    uint256 time;
}

enum OrderStatus {
    TOSEND,
    TORECEIVE,
    TODELIVER,
    TOEND,
    END
}

struct Order {
    bytes32 fromStation;
    bytes32 toStation;
    string fromAddress;
    string toAddress;
    string senderName;
    string senderPhone;
    string receiverName;
    string receiverPhone;
    uint256 createTime;
    bytes32 hash;
    OrderStatus status;
}

// 站点订单列表
struct Node {
    bytes32 orderHash;
    uint256 prev;
    uint256 next;
}

struct List {
    Node[] list;
    uint256 head;
    uint256 emptyHead;
    uint256 cnt;
}



contract Transport {
    event NewOrder(bytes32 hash);

    mapping (bytes32 => Order) hashToOrder;
    // 手机号查询订单
    mapping (string => Order[]) phoneToOrder;
    // 站点订单列表
    mapping (bytes32 => List) stationToOrderList;
    mapping (bytes32 => bytes32) hashToStation;
    mapping (bytes32 => uint256) hashToPos;

    // 订单操作
    mapping (bytes32 => OrderAction[]) hashToActionList;

    function _insertToStationList(
        bytes32 station,
        bytes32 hash
    ) internal {
        List storage list = stationToOrderList[station];
        if (list.list.length == 0) {
            list.list.push(Node('', 0, 0));
            list.head = 0;
            list.emptyHead = 0;
            list.cnt = 0;
        }
        if (list.emptyHead != 0) {
            uint256 emptyPos = list.emptyHead;
            list.emptyHead = list.list[emptyPos].next;
            list.list[emptyPos].orderHash = hash;
            list.list[emptyPos].next = list.list[list.head].next;
            list.list[list.head].next = emptyPos;
            hashToPos[hash] = emptyPos;
        } else {
            list.list.push(Node(hash, 0, list.list[list.head].next));
            list.list[0].next = list.list.length - 1;
            hashToPos[hash] = list.list.length - 1;
        }
        list.cnt++;
        hashToStation[hash] = station;
    }

    function _deleteOrderFromStationListByHash(
       bytes32 hash 
    ) internal {
        bytes32 station = hashToStation[hash];
        uint256 pos = hashToPos[hash];
        List storage list = stationToOrderList[station];
        list.list[list.list[pos].prev].next = list.list[pos].next;
        list.list[list.list[pos].next].prev = list.list[pos].prev;
        list.list[pos].next = list.emptyHead;
        list.emptyHead = pos;
        list.cnt--;
    }

    function createOrder(
        bytes32 fromStation,
        bytes32 toStation,
        string memory fromAddress,
        string memory toAddress,
        string memory senderName,
        string memory senderPhone,
        string memory receiverName,
        string memory receiverPhone
    ) public {
        // 新建订单
        Order memory order = Order(
            fromStation,
            toStation,
            fromAddress,
            toAddress,
            senderName,
            senderPhone,
            receiverName,
            receiverPhone,
            block.timestamp,
            '0',
            OrderStatus.TOSEND
        );

        bytes32 orderHash = keccak256(abi.encode(
            fromStation,
            toStation,
            fromAddress,
            toAddress,
            senderName,
            senderPhone,
            receiverName,
            receiverPhone,
            block.timestamp
        ));

        order.hash = orderHash;

        hashToOrder[orderHash] = order;
        phoneToOrder[senderPhone].push(order);
        phoneToOrder[receiverPhone].push(order);
        // TODO: 插入链表
        _insertToStationList(fromStation, orderHash);
        hashToActionList[orderHash].push(OrderAction(ActionType.START, fromStation, fromStation, msg.sender, block.timestamp));

        emit NewOrder(orderHash);
    }

    function sendOrder(
        bytes32 hash,
        bytes32 toStation
    ) public {
        bytes32 curStation = hashToStation[hash];
        _deleteOrderFromStationListByHash(hash);
        hashToActionList[hash].push(OrderAction(ActionType.SEND, curStation, toStation, msg.sender, block.timestamp));
        hashToOrder[hash].status = OrderStatus.TORECEIVE;
        _insertToStationList(toStation, hash);
    }

    function receiveOrder(
        bytes32 hash,
        bytes32 station
    ) public {
        hashToActionList[hash].push(OrderAction(ActionType.RECIEVE, station, station, msg.sender, block.timestamp));
        if (hashToOrder[hash].toStation == station) {
            hashToOrder[hash].status = OrderStatus.TODELIVER;
        } else {
            hashToOrder[hash].status = OrderStatus.TOSEND;
        }
    }

    function deliverOrder(
        bytes32 hash
    ) public {
        hashToOrder[hash].status = OrderStatus.TOEND;
    }


    function endOrder(
        bytes32 hash,
        bytes32 station
    ) public {
        hashToActionList[hash].push(OrderAction(ActionType.END, station, station, msg.sender, block.timestamp));
        hashToOrder[hash].status = OrderStatus.END;
        _deleteOrderFromStationListByHash(hash);
    }

    function getOrderActionList(
        bytes32 hash
    ) public view returns(
        ActionType[] memory,
        bytes32[] memory,
        bytes32[] memory,
        address[] memory,
        uint256[] memory
    ) {
        OrderAction[] memory list = hashToActionList[hash];
        ActionType[] memory action = new ActionType[](list.length);
        bytes32[] memory fromStation = new bytes32[](list.length);
        bytes32[] memory toStation = new bytes32[](list.length);
        address[] memory operator = new address[](list.length);
        uint256[] memory time = new uint256[](list.length);
        for (uint i = 0; i < list.length; i++) {
            action[i] = list[i].action;
            fromStation[i] = list[i].from;
            toStation[i] = list[i].to;
            operator[i] = list[i].operator;
            time[i] = list[i].time;
        }
        return (
            action,
            fromStation,
            toStation,
            operator,
            time
        );
    }

    function getStationOrderHashList(
        bytes32 station
    ) public view returns(
        bytes32[] memory
    ) {
        List storage list = stationToOrderList[station];
        bytes32[] memory res = new bytes32[](list.cnt);
        if (list.cnt == 0) {
            return res;
        }
        uint256 pos = list.head;
        uint256 cnt = 0;
        while (list.list[pos].next != list.head) {
            pos = list.list[pos].next;
            res[cnt] = list.list[pos].orderHash;
            cnt++;
        }
        return res;
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
        string memory receiverName,
        string memory receiverPhone,
        uint256 createTime,
        OrderStatus status
    ) {
        Order memory order = hashToOrder[hash];

        return (
            order.fromStation,
            order.toStation,
            order.fromAddress,
            order.toAddress,
            order.senderName,
            order.senderPhone,
            order.receiverName,
            order.receiverPhone,
            order.createTime,
            order.status
        );
    }
}
