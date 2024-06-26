const BASE_URL = 'http://localhost:9527';


const api = {
    // access
    LOGIN_POST: BASE_URL + '/login',
    VALIDATE_TOKEN_GET: BASE_URL + '/login/validate',
    // user
    USER_LIST_GET: BASE_URL + '/user/list',
    ALTER_USER_POST: BASE_URL + '/user/alter',
    DELETE_USER_POST: BASE_URL + '/user/delete',
    ADD_USER_POST: BASE_URL + '/user/add',
    // station
    STATION_LIST_GET: BASE_URL + '/station/list',
    ADD_STATION_POST: BASE_URL + '/station/add',
    ALTER_STATION_POST: BASE_URL + '/station/alter',
    DELETE_STATION_POST: BASE_URL + '/station/delete',
    // order
    NEW_ORDER_POST: BASE_URL + '/order/new',
    ORDER_DETAIL_GET: BASE_URL + '/order/detail/',
    ORDER_TO_RECEIVE_GET: BASE_URL + '/order/receive/',
    ORDER_TO_SEND_GET: BASE_URL + '/order/send/',
    ORDER_TO_DELIVER_GET: BASE_URL + '/order/deliver/',
    ORDER_TO_END_GET: BASE_URL + '/order/end/',
    SEND_ORDER_POST: BASE_URL + '/order/send',
    RECEIVE_ORDER_POST: BASE_URL + '/order/receive',
    DELIVER_ORDER_POST: BASE_URL + '/order/deliver',
    END_ORDER_POST: BASE_URL + '/order/end',
    ORDER_ACTIONS_GET: BASE_URL + '/order/actions/',
};

export { api };
