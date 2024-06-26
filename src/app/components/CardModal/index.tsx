import React from "react";
import {Result, Card, Button} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import styles from './style.module.scss';

interface ICardModalProps {
    title: string;
    subtitle: string;
    onClose: () => void;
}

const CardModal: React.FC<ICardModalProps> = ({ title, subtitle, onClose }) => {

    return (
        <Card bordered={false}>
            <Result status='success' title={title} subTitle={subtitle}/>
            <Button onClick={onClose} className={styles.closeButton} type="text" danger
                    icon={<CloseOutlined style={{ fontSize: "24px" }} />}
            />
        </Card>
    );

};

export default CardModal;
