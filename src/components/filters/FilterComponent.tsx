import CountryFilter from "./CountryFilter";
import AgeRatingFilter from "./AgeRatingFilter";
import YearFilter from "./YearFilter";
import { Button, Form, Row } from "antd";
import { filterActions } from "../../store/filterSlice";
import { FC } from "react";
import { useAppDispatch } from "../../hooks/hooks";

const FilterComponent:FC<any> = ({ formStyle }) => {
  const dispatch = useAppDispatch();
  return (
    <Form layout="vertical" size="large" style={formStyle}>
      <Form.Item label="Страны" style={{ marginLeft: 10 }}>
        <CountryFilter />
      </Form.Item>
      <Form.Item label="Годы" style={{ marginLeft: 10 }}>
        <YearFilter />
      </Form.Item>
      <Form.Item label="Возрастной рейтинг" style={{ marginLeft: 10 }}>
        <AgeRatingFilter />
      </Form.Item>
      <Row justify="center">
        <Form.Item>
          <Button danger onClick={() => dispatch(filterActions.clearFilters())}>
            Очистить фильтры
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default FilterComponent;
