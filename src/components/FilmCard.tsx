import { Card, Row, Col } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

interface FilmCardProps {
  id:number, 
  name:string, 
  poster:string|null, 
  styleProps:{}
}

const FilmCard:FC<FilmCardProps> = ({ id, name, poster, styleProps }) => {
  return (
    <div>
      <Link to={`/${id}`} style={{ textDecoration: "none" }}>
        <Card
          hoverable
          style={styleProps}
          cover={poster && <img alt="example" src={poster} />}
        >
          <h3>{name}</h3>
        </Card>
      </Link>
    </div>
  );
};
export default FilmCard;
