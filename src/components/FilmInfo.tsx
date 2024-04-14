import {  Col, Image, Row, Button } from "antd";
import  { FC } from "react";
import { Link } from "react-router-dom";
import ActorCard from "./ActorCard";
import FilmCard from "./FilmCard";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReviewCard from "./ReviewCard";
import PaginationReview from "./pagination/PaginationReviews";
import Loader from "./Loader";
import Error from "./Error";
import PaginationActors from "./pagination/PaginationActors";
import PaginationSeasons from "./pagination/PaginationSeasons";
import { useAppSelector } from "../hooks/hooks";

const FilmInfo:FC = () => {
  const {
    film,
    posters,
    postersStatus,
    reviews,
    reviewStatus,
    actors,
    seasons,
    seasonsStatus,
  } = useAppSelector((state) => state.film);
  const carouselSimilar =
    film?.similarMovies &&
    film.similarMovies.map((film) => (
      <FilmCard
        key={film.id}
        id={film.id}
        name={film.name}
        poster={film.poster.url}
        styleProps={{ marginTop: 25 }}
      />
    ));
  const carouselPosters =
    posters?.docs &&
    posters.docs.map((poster) => <Image key={poster.id} src={poster.url} />);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, 
    },
  };
  return (
    <div>
      <Row gutter={[20, 16]} justify="center" style={{ marginTop: "15px" }}>
        <Col xs={20} sm={20} md={8} lg={6}>
          <div className="gameData-ava">
            <Row gutter={[0, 48]} justify="center">
              <Col>
                {film?.poster.url ? (
                  <Image
                    src={film.poster.url}
                    style={{ width: "100%" }}
                    alt="постер"
                  />
                ) : (
                  <div>Нет фото</div>
                )}
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button style={{ width: "100%", marginTop: "20px" }}>
                    К списку фильмов
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>

        <Col xs={20} sm={20} md={12} lg={12}>
          <h1>
            {film?.name} ({film?.year})
          </h1>
          <h3 style={{ color: "grey" }}>
            {film?.alternativeName} {film?.ageRating ? `${film.ageRating}+` : ""}
          </h3>
          <Row gutter={[16, 16]} justify="space-between">
            <Col span={24}>{film?.shortDescription}</Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={[20, 16]} justify="center" style={{ marginTop: "15px" }}>
        <Col span={20}>
          {" "}
          <h2 style={{ margin: "15px 0" }}>О фильме </h2>
        </Col>
        <Col span={20}>{film?.description}</Col>
        <Col span={20}>
          <h3>Рейтинг</h3>
          {film?.rating.kp.toFixed(1)}
        </Col>
        <Col span={20}>
          <h3>Список актеров</h3>

          {actors ? (
            <div>
              <Row gutter={[24, 24]}>
                {actors.docs &&
                  actors.docs.map((actor) => (
                    <ActorCard key={actor.id} {...actor} />
                  ))}
              </Row>
              <div style={{ marginTop: 20 }}>
                <PaginationActors total={actors?.total} />
              </div>
            </div>
          ) : (
            <div>Нет информации об актерах</div>
          )}
        </Col>

        {film?.isSeries && (
          <Col span={20}>
            <h3>Список сезонов и серий</h3>
            <div>
              {!film?.seasonsInfo?.length ? (
                <div>Нет информации о сезонах</div>
              ) : (
                <div>
                  {seasonsStatus === "loading" ? (
                    <Loader />
                  ) : seasonsStatus === "failed" ? (
                    <Error />
                  ) : (
                    <div>
                      <h4>{seasons?.docs[0].name}</h4>

                      {seasons?.docs[0]?.episodes &&
                        seasons.docs[0].episodes.map((episode, index) => (
                          <div key={index}>
                            {episode.number}. {episode.name}
                          </div>
                        ))}

                      <PaginationSeasons total={film.seasonsInfo.length} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </Col>
        )}

        <Col span={20}>
          <h3>Постеры и фото</h3>
          {postersStatus === "loading" ? (
            <Loader />
          ) : postersStatus === "failed" ? (
            <Error />
          ) : carouselPosters?.length && carouselPosters.length > 0 ? (
            <Carousel
              responsive={responsive}
              showDots={true}
              infinite={true}
              autoPlaySpeed={3000}
              autoPlay={true}
            >
              {carouselPosters}
            </Carousel>
          ) : (
            <div>Нет фото</div>
          )}
        </Col>

        <Col span={20}>
          <h3>Похожие фильмы</h3>

          {carouselSimilar?.length && carouselSimilar.length > 0 ? (
            <Carousel
              responsive={responsive}
              showDots={true}
              infinite={true}
              autoPlaySpeed={3000}
              autoPlay={true}
              itemClass="carousel-item-padding-40-px"
              containerClass="carousel-container"
            >
              {carouselSimilar}
            </Carousel>
          ) : (
            <div>Нет информации о похожих фильмах</div>
          )}
        </Col>

        <Col span={20}>
          <h3>Отзывы зрителей</h3>
          {reviewStatus === "loading" ? (
            <Loader />
          ) : reviewStatus === "failed" ? (
            <Error />
          ) : reviews?.docs?.length && reviews.docs.length > 0 ? (
            <div>
              {reviews.docs.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}

              <PaginationReview total={reviews?.total} />
            </div>
          ) : (
            <div>Нет отзывов</div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default FilmInfo;