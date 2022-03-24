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
    NEW_ORDER_POST: BASE_URL + '/order/new'
};

export { api };
