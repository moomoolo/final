import { message, Tooltip } from "antd";
import { CopyOutlined } from '@ant-design/icons';

import hashInTableStyles from './renderHashInTable.module.css';

const getHeader = () => {
    return {
        "Content-Type": "application/json",
        "Authentication": "Bearer " + localStorage.getItem("access_token")
    }
};

const renderHashInTable = (hash) => {
    const shortcut = hash.substr(0, 6) + '...' + hash.substring(hash.length - 4, hash.length);
    const onCopyClick = () => {
        navigator.clipboard.writeText(hash)
        .then((res) => {
            message.success('已复制到剪切板');
        })
    }
    return (
        <Tooltip title={hash}>
            <span>{shortcut}</span>
            <span>
                <CopyOutlined className={hashInTableStyles.icon} onClick={onCopyClick} />
            </span>
        </Tooltip>
    )
}

export { getHeader, renderHashInTable }