import React, { useState } from "react";
import { Button, notification } from "antd";
import "antd/dist/antd.css";
import { useSelector ,useDispatch } from "react-redux";

import "./style.css";
import { api } from '../../config';
import PageLayout from "../../component/PageLayout";
import actionType from "../../state/actionType";
import { Navigate } from "react-router";

const Login = () => {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);

  const userInfo = useSelector(state => state.userInfo);
  const dispatch = useDispatch();

  const onIdChange = (evt) => {
    setId(evt.target.value);
  }
  const onPasswdChange = (evt) => {
    setPasswd(evt.target.value);
  }

  const onLoginButtonClick = async () => {
    setButtonDisable(true);
    fetch(api.LOGIN_POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        passwd
      })
    })
    .then((res) => {
      if (res.status === 200) {
        notification.open({
          message: '登录成功',
        })
        res.json().then((data) => {
          localStorage.setItem('access_token', data.jwtToken);
          dispatch({
            type: actionType.changeUserInfo,
            payload: data.userInfo,
          })
        })
      } else {
        notification.open({
          message: '登录失败',
        })
      }
      setButtonDisable(false);
    }).catch();
  }

  if (userInfo) {
    return <Navigate to={'/'}/>
  }

  return (
    <PageLayout>
      <div className="container">
        <div className="panel">
          <div className="wrapper">
            <input
              className="input"
              value={id}
              onChange={onIdChange}
              required
            />
            <div className="hint">用户名</div>
          </div>
          <div className="wrapper">
            <input
              className="input"
              type={"password"}
              value={passwd}
              onChange={onPasswdChange}
              required
            />
            <div className="hint">密码</div>
          </div>
          <Button
            disabled={buttonDisable}
            className="button"
            type="primary"
            onClick={onLoginButtonClick}
          >登录</Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
