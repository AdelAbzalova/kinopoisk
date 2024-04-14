import { FC, useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import ModalOut from "./modal/ModalOut";
import ModalIn from "./modal/ModalIn";
import { useAppSelector } from "../hooks/hooks";

const HeaderComponent:FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthorized } = useAppSelector((state) => state.chance);
  const text = isAuthorized ? "Выйти" : "Войти";
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const changeLog = () => {
    showModal();
  };

  return (

    <header style={{
      textAlign: "center",
      color: "#fff",
      height: 64,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "black",
    }}>
      {isAuthorized && (
        <Link to="/chance" rel="noopener noreferrer">
          <Button shape="round">Случайный фильм</Button>
        </Link>
      )}
      <SearchComponent />

      <>
        <Button shape="round" onClick={changeLog}>
          {text}
        </Button>
      </>

      {isAuthorized ? (
        <ModalOut
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleCancel={handleCancel}
        />
      ) : (
        <ModalIn
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleCancel={handleCancel}
        />
      )}
    </header>
  );
};

export default HeaderComponent;