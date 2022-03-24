import React from "react";
import { Button, Layout } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import './style.css';
import actionType from "../../state/actionType";

const { Header } = Layout;

export default function PageHeader() {
  const userInfo = useSelector((state) => state.userInfo);
  const roleStr = userInfo?.role_str;
  const dispatch = useDispatch();
  
  const logout = () => {
    localStorage.removeItem('access_token');
    dispatch({
        type: actionType.changeUserInfo,
        payload: {}
    });
  }

  return (
    <Header className="header">
      <Link className="link start" to={"/"}>
        主页
      </Link>
      {roleStr === "admin" && (
        <Link className="link start" to={"/admin/user_list"}>
          管理
        </Link>
      )}
      {roleStr === 'postman' && (
          <Link className="link start" to={"/postman"}>
              操作
          </Link>
      )}
      {!roleStr && (
        <Link className="link end" to={"/login"}>
          登录
        </Link>
      )}
      {roleStr && 
        <div className="name end">
            <span>{userInfo.name_str}</span>
            <Button
                size="small"
                className="logout_button"
                type="danger"
                onClick={logout}
            >登出</Button>
        </div>}
    </Header>
  );
}
