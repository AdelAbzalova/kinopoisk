import { Modal } from "antd";
import { FC } from "react";
import { LegacyButtonType } from "antd/es/button/button";

interface ModalCompProps {
title:string, 
handleOk:()=>void, 
okText:string,
okType:LegacyButtonType | undefined
children:React.ReactNode, 
isModalOpen:boolean, 
handleCancel:()=>void,
}

const ModalComponent:FC<ModalCompProps>=(props)=>{
    return (
        <>
        <Modal centered 
        title={props.title}
        open={props.isModalOpen} 
        onOk={props.handleOk} 
        onCancel={props.handleCancel} 
        okText={props.okText}
        okType={props.okType}
        cancelText='Отмена'>
            {props.children}
            </Modal></>
    )
}

export default ModalComponent;