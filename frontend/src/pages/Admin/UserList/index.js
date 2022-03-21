import { Button, Form, Modal, Input, Table, Tag, Tooltip, message } from "antd";
import React, { useEffect, useState } from "react";
import { api } from "../../../config";

import './style.css';

const roleMap = {
    'admin': '管理员',
}

const renderRole = (role) => {
    const roleEleMap = {
        'admin': (
            <Tag color={'red'}>管理员</Tag>
        )
    }
    return (
        <span>
            {roleEleMap[role]}
        </span>
    )
}

const renderPasswd = (passwd) => {
    return (
        <Tooltip title={passwd}>
            <span>********</span>
        </Tooltip>
    )
}


let refreshOutside;
const renderOper = (text, record) => {
    const alterUser = () => {
        const info = { ...record }
        // 显示编辑表单
        Modal.confirm({
            icon: null,
            content: (
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Form.Item label={'ID'}>
                        <Input defaultValue={info.id} disabled />
                    </Form.Item>
                    <Form.Item label={'姓名'}>
                        <Input
                            defaultValue={info.name_str}
                            onChange={(evt) => {
                                info.name_str = evt.target.value;
                            }}
                        />
                    </Form.Item>
                    <Form.Item label={'密码'}>
                        <Input.Password
                            defaultValue={info.passwd}
                            onChange={(evt) => {
                                info.passwd = evt.target.value;
                            }}
                        />
                    </Form.Item>
                    <Form.Item label={'网络地址'}>
                        <Input defaultValue={info.address} disabled/>
                    </Form.Item>
                    <Form.Item label={'角色'}>
                        <Input defaultValue={roleMap[info.role_str]} disabled/>
                    </Form.Item>
                </Form>
            ),
            okText: '提交',
            cancelText: '取消',
            onOk: () => {
                fetch(api.ALTER_USER_POST, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': 'Bearer ' + localStorage.getItem('access_token')
                    },
                    body: JSON.stringify(info)
                }).then((res) => {
                    if (res.status === 200) {
                        message.success('修改成功');
                        refreshOutside();
                    } else {
                        message.error('修改失败，请重试');
                    }
                })
                message.info('已提交，请稍等');
            }
        })
    }
    const deleteUser = () => {
        const info = { ...record };
        Modal.confirm({
            icon: null,
            content: `是否删除用户 ${info.id}`,
            okType: 'danger',
            okText: '删除',
            onOk: () => {
                fetch(api.DELETE_USER_POST, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': 'Bearer ' + localStorage.getItem('access_token')
                    },
                    body: JSON.stringify(info)
                }).then(res => {
                    if (res.status === 200) {
                        message.success('删除成功');
                        refreshOutside();
                    } else {
                        message.error('删除失败');
                    }
                });
                message.info('已提交，请稍等');
            }
        })
    }
    return (
        <span>
            <Button
                type="primary"
                style={{margin: '0 10px 0 0'}}
                onClick={alterUser}
            >修改</Button>
            <Button
                type="danger"
                onClick={deleteUser}
            >删除</Button>
        </span>
    )
}


const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '姓名',
        dataIndex: 'name_str',
        key: 'name_str',
    },
    {
        title: '密码',
        dataIndex: 'passwd',
        key: 'passwd',
        render: renderPasswd
    },
    {
        title: '身份',
        dataIndex: 'role_str',
        key: 'role_str',
        render: renderRole
    },
    {
        title: '网络地址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '操作',
        dataIndex: 'oper',
        key: 'oper',
        render: renderOper
    }
];

export default function UserList() {
    const [userList, setUserList] = useState(null);

    const refresh = () => {
        fetch(api.USER_LIST_GET, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    data.forEach(item => {
                        item.key = item.id;
                    })
                    console.log(data);
                    setUserList(data);
                }) 
            }
        })
    }

    // 设置refreshOutside用于在修改和删除时刷新页面
    refreshOutside = refresh;

    useEffect(() => {
        refresh();
    }, [setUserList]);


    

    return (
        <div className="container">
            <div className="wrapper">
                <Table
                    className="table"
                    size="middle"
                    columns={columns}
                    dataSource={userList}
                >

                </Table>
                <Button
                    type="primary"
                    className="add_button"
                >新增</Button>
            </div>
        </div>
    )
}
