import React, { useState } from "react";
import { Button, notification } from "antd";
import "antd/dist/antd.css";
import "./style.css";

import { api } from '../../config';

const Login = () => {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);

  const onIdChange = (evt) => {
    setId(evt.target.value);
  }
  const onPasswdChange = (evt) => {
    setPasswd(evt.target.value);
  }

  const onLoginButtonClick = async () => {

    console.log('logining');
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
        })
      } else {
        notification.open({
          message: '登录失败',
        })
      }
      setButtonDisable(false);
    }).catch();
  }

  return (
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
  );
};

export default Login;
