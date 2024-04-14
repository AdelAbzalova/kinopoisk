import Loader from "./Loader";
import Error from "./Error";
import FilterComponent from "./filters/FilterComponent";
import PaginationMain from "./pagination/PaginationMain";
import HeaderComponent from "./HeaderComponent";
import FilmListItem from "./FilmListItem";
import { useState, FC } from "react";
import { useResize } from "../hooks/useResize";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import PaginationSearch from "./pagination/PaginationSearch";
import { useAppSelector } from "../hooks/hooks";

const MainPage:FC = () => {
  const { films, status } = useAppSelector((state) => state.films);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isScreenMd } = useResize();
  const mode = useAppSelector((state) => state.films.mode);
  let mdListStyles = { width: "70%", position: "absolute", right: 10 };
  let smListStyles = { width: "90%" };
  let listStyle = isScreenMd ? mdListStyles : smListStyles;
  let mdFormStyles = {
    maxWidth: 600,
    border: "1px solid #f7f8fa",
    borderRadius: 10,
    boxShadow: "0 0 8px #e6e6e6",
    backgroundColor: "#f7f8fa",
    position: "fixed",
    width: "25%",
    top: "20%",
    left: 20,
  };
  let formStyle = isScreenMd ? mdFormStyles : "";

  return (
    <div>
      <HeaderComponent />

      {status === "failed" && <Error />}
      {status === "loading" && <Loader />}
      {status === "succeeded" && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {!isScreenMd ? (
            <Button onClick={() => setIsModalOpen(true)}>
              <FilterOutlined />
              Фильтры
            </Button>
          ) : (
            <FilterComponent formStyle={formStyle} />
          )}

    
            {films &&
                  <div style={listStyle}>
              {films.docs?.map((film) => (
                <FilmListItem key={film.id} {...film} />
              ))
}
            {mode === "filter" ? (
              <PaginationMain total={films.pages} />
            ) : (
              <PaginationSearch total={films.pages} />
            )}
              </div>
}
        
        </div>
      )}
      <Modal
        title="Фильтры"
        open={isModalOpen}
        width="100%"
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <FilterComponent formStyle={formStyle} />
      </Modal>
    </div>
  );
}
export default MainPage;
