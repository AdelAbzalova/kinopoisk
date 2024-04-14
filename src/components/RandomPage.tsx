import GenreFilter from "./filters/GenreFilter";
import { FC, useEffect, useState } from "react";
import { fetchRandomFilm } from "../store/chanceSlice";
import YearSlider from "./filters/YearSlider";
import CountryFilter from "./filters/CountryFilter";
import TypeContentFilter from "./filters/TypeContentFilter";
import RatingFilter from "./filters/RatingFilter";
import { Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchGenres } from "../store/filterSlice";
import ProductionFilter from "./filters/ProductionFilter";
import Loader from "./Loader";
import Error from "./Error";
import HeaderComponent from "./HeaderComponent";
import ModalIn from "./modal/ModalIn";
import { filterActions } from "../store/filterSlice";
import { useResize } from "../hooks/useResize";
import YearFilter from "./filters/YearFilter";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const RandomPage:FC = () => {
  const dispatch = useAppDispatch();
  const { randomFilm, status } = useAppSelector((state) => state.chance);
  const {
    genreFilter,
    contentFilter,
    ratingFilter,
    yearFilter,
    productionFilter,
    countryFilter,
  } = useAppSelector((state) => state.filters);
  const { isAuthorized } = useAppSelector((state) => state.chance);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isScreenSm } = useResize();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);
  useEffect(() => {
    const promise = dispatch(fetchRandomFilm());
    return () => {
      promise.abort();
    };
  }, [
    dispatch,
    genreFilter,
    contentFilter,
    ratingFilter,
    yearFilter,
    productionFilter,
    countryFilter,
  ]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const openFilmPage = () => {
    if (isAuthorized) {
      navigate(`/${randomFilm}`);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <HeaderComponent></HeaderComponent>
      <Row gutter={[12, 12]} justify="center" style={{ margin: "20px 0" }}>
        <Col xs={22} md={11} lg={11}>
          <GenreFilter />
        </Col>
        <Col xs={22} md={11} lg={11}>
          <CountryFilter />
        </Col>
        <Col xs={22} md={11} lg={7}>
          <TypeContentFilter />
        </Col>
        <Col xs={22} md={11} lg={7}>
          <RatingFilter />
        </Col>
        <Col xs={22} md={11} lg={7}>
          <ProductionFilter />
        </Col>

        {isScreenSm ? (
          <Col span={21}>
            <YearSlider />
          </Col>
        ) : (
          <Col xs={22} md={11} lg={7}>
            <YearFilter />
          </Col>
        )}

        <Col xs={20} md={10} lg={4}>
          <Button
            danger
            style={{ width: "100%" }}
            onClick={() => dispatch(filterActions.clearChanceFilters())}
          >
            Очистить фильтры
          </Button>
        </Col>
      </Row>

      <div></div>

      <Row gutter={[12, 12]} justify="center" style={{ margin: "20px 0" }}>
        <Button
          onClick={openFilmPage}
          disabled={status !== "succeeded"}
          style={{ width: "90%", height: "100px", borderRadius: 30 }}
        >
          Случайный фильм
        </Button>
      </Row>
      {status === "loading" && <Loader />}
      {status === "failed" && <Error />}

      {!randomFilm && status === "succeeded" && (
        <Row gutter={[12, 12]} justify="center" style={{ margin: "20px 0" }}>
          <div style={{ margin: "10px" }}>
            Ничего не найдено. Попробуйте другие параметры
          </div>
        </Row>
      )}

      <ModalIn
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default RandomPage;
