import { Card, Image, Col, Row } from "antd";
import { FC } from "react";
import { ActorsDocs } from "./models";

const ActorCard:FC<ActorsDocs> = ({ name, photo, enName }) => {
  return (
    <Col xs={18} sm={11} md={5} xl={4}>
      <Card style={{ width: "100%" }}>
        {photo ? <Image src={photo} /> : <div>нет фото</div>}
        <h3>{name ? name : enName}</h3>
      </Card>
    </Col>
  );
};

export default ActorCard;
