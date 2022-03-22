import { createStore } from 'redux';
import { api } from '../config';
import fetch from 'sync-fetch';
import reducer from './reducer';

const initialState = {
    // 存储用户登录态
    userInfo: {},
};

// 验证当前token是否有效

const accessToken = localStorage.getItem("access_token");

if (accessToken) {
    const res = fetch(api.VALIDATE_TOKEN_GET, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authentication": "Bearer " + accessToken,
        }
    })
    if (res.status === 200) {
        // token有效，初始化角色
        const data = res.json();
        initialState.userInfo = data.userInfo;
    } 
}

const globalStore = createStore(reducer, initialState);

export default globalStore;
