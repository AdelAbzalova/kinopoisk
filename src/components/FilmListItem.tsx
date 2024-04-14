import { Card, Image } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { FilmsDocs } from "./models";
const { Meta } = Card;

const FilmListItem:FC<FilmsDocs> = ({
  id,
  name,
  alternativeName,
  year,
  poster,
  movieLength,
  seriesLength,
}) => {
  const nameParam = alternativeName ? `${alternativeName}, ` : "";
  const lengthParam = movieLength
    ? `, ${movieLength} мин.`
    : seriesLength
    ? `, ${seriesLength} мин.`
    : "";


  return (
    <div style={{ margin: "20px 0" }}>
      <Link to={`/${id}`} style={{ textDecoration: "none" }}>
        <Card
          hoverable
        >
          <Meta
            avatar={ poster.url && <Image src={poster.url} style={{ width: 100 }} />}
            title={name}
            description={` ${nameParam}${year}${lengthParam}`}
          />
        </Card>
      </Link>
    </div>
  );
};
export default FilmListItem;
