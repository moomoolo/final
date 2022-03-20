import { Button, Form, Modal, Input, Table, Tag, Tooltip } from "antd";
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

const renderOper = (text, record) => {
    const alter = () => {
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
                        <Input value={info.id} disabled />
                    </Form.Item>
                    <Form.Item label={'姓名'}>
                        <Input
                            value={info.name_str}
                            onChange={(evt) => {
                                info.name_str = evt.target.value;
                            }}
                        />
                    </Form.Item>
                    <Form.Item label={'密码'}>
                        <Input.Password
                            value={info.passwd}
                            onChange={(evt) => {
                                info.passwd = evt.target.value;
                            }}
                        />
                    </Form.Item>
                    <Form.Item label={'网络地址'}>
                        <Input value={info.address} disabled/>
                    </Form.Item>
                    <Form.Item label={'角色'}>
                        <Input value={roleMap[info.role_str]} disabled/>
                    </Form.Item>
                </Form>
            ),
            okText: '提交',
            cancelText: '取消',
            onOk: () => {
                
            }
        })
    }
    return (
        <span>
            <Button
                type="primary"
                style={{margin: '0 10px 0 0'}}
                onClick={alter}
            >修改</Button>
            <Button type="danger">删除</Button>
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

    useEffect(() => {
        refresh();
    }, [setUserList]);

    return (
        <div className="container">
            <Table
                className="table"
                size="middle"
                columns={columns}
                dataSource={userList}
            >

            </Table>
        </div>
    )
}
