import { Card, Avatar } from "antd";
import { FC } from "react";
import { ReviewDocs } from "./models";
const { Meta } = Card;

const ReviewCard:FC<ReviewDocs> = ({ author, userRating, title, review, type }) => {
  const backgroundColor =
    type === "Позитивный"
      ? { backgroundColor: "rgb(237,247,236)" }
      : type === "Негативный"
      ? { backgroundColor: "rgb(255,238,238)" }
      : { backgroundColor: "rgb(242,242,242)" };
  const styles = {
    ...backgroundColor,
    border: "1px solid rgb(227,227,227)",
    margin: "20px 0",
  };
  return (
    <Card
      style={styles}
      bordered={false}
    >
      <Meta
        avatar={<Avatar src="" />}
        title={author}
        description={`${userRating} рецензий`}
      />
      <div
        style={{ borderBottom: "1px solid rgb(227,227,227)", marginTop: 20 }}
      ></div>
      <h3>{title}</h3>
      <div>{review}</div>
    </Card>
  );
};
export default ReviewCard;
