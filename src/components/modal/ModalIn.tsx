import { FC, useState } from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/chanceSlice";
import ModalComponent from "./ModalComponent";
import { ModalProps } from "../models";


const ModalIn:FC<ModalProps> = ({ isModalOpen, handleCancel, setIsModalOpen }) => {
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const dispatch = useDispatch();
  const handleOkLogIn = () => {
    if (password === 'password' && login === 'login') {
      dispatch(logIn());
      setPassword("");
      setLogin("");
      setIsModalOpen(false);
    }
  };
  const changePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const changeLogin = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  return (
    <>
      <ModalComponent
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOkLogIn}
        title="Авторизация"
        okText="Войти"
        okType="primary"
      >
        <Input
          status={login ? "" : "error"}
          value={login}
          onChange={changeLogin}
          placeholder="Логин или email"
          style={{ margin: "20px 0" }}
        />
        <Input.Password
          status={password ? "" : "error"}
          value={password}
          onChange={changePassword}
          placeholder="Пароль"
          style={{ marginBottom: 20 }}
        />
      </ModalComponent>
    </>
  );
};
export default ModalIn;
