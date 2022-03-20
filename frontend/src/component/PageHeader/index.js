import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import './style.css';

const { Header } = Layout;

export default function PageHeader() {
  const userInfo = useSelector((state) => state.userInfo);
  const roleStr = userInfo?.role_str;
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
      {!userInfo && (
        <Link className="link end" to={"/login"}>
          登录
        </Link>
      )}
      {userInfo && <div className="name end">{userInfo.name_str}</div>}
    </Header>
  );
}
