const BASE_URL = 'http://localhost:9527';


const api = {
    LOGIN_POST: BASE_URL + '/login',
    VALIDATE_TOKEN_GET: BASE_URL + '/login/validate',
    USER_LIST_GET: BASE_URL + '/user/list',
    ALTER_USER_POST: BASE_URL + '/user/alter',
};

export { api };
