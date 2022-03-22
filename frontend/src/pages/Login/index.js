import React, { useState } from "react";
import { Button, message, notification } from "antd";
import "antd/dist/antd.css";
import { useSelector ,useDispatch } from "react-redux";

import styles from './style.module.css';
import { api } from '../../config';
import actionType from "../../state/actionType";
import { Navigate } from "react-router";
import PageLayoutWithContent from "../../component/PageLayoutWithContent";

const Login = () => {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);

  const userInfo = useSelector(state => state.userInfo);
  const dispatch = useDispatch();

  // 受控组件
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
        message.success('登录成功')
        res.json().then((data) => {
          localStorage.setItem('access_token', data.jwtToken);
          dispatch({
            type: actionType.changeUserInfo,
            payload: data.userInfo,
          })
        })
      } else {
        message.error('登录失败')
      }
      setButtonDisable(false);
    }).catch();
  }

  if (userInfo.role_str) {
    return <Navigate to={'/'}/>
  }

  return (
    <PageLayoutWithContent>
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.wrapper}>
            <input
              className={styles.input}
              value={id}
              onChange={onIdChange}
              required
            />
            <div className={styles.hint}>用户名</div>
          </div>
          <div className={styles.wrapper}>
            <input
              className={styles.input}
              type={"password"}
              value={passwd}
              onChange={onPasswdChange}
              required
            />
            <div className={styles.hint}>密码</div>
          </div>
          <Button
            disabled={buttonDisable}
            className={styles.button}
            type="primary"
            onClick={onLoginButtonClick}
          >登录</Button>
        </div>
      </div>
    </PageLayoutWithContent>
  );
};

export default Login;
