
import { FC } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/chanceSlice";
import { ModalProps } from "../models";
import ModalComponent from "./ModalComponent";



const ModalOut:FC<ModalProps> = ({ isModalOpen, setIsModalOpen, handleCancel }) => {
  const dispatch = useDispatch();
  const handleOkLogOut = () => {
    setIsModalOpen(false);
    dispatch(logOut());
  };
  return (
    <>
      <ModalComponent
        isModalOpen={isModalOpen}
        handleOk={handleOkLogOut}
        handleCancel={handleCancel}
        title="Вы уверены, что хотите выйти?"
        okText="Выйти"
        okType="danger"
      ><></></ModalComponent>
    </>
  );
};

export default ModalOut;
