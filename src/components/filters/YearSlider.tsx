import React, { FC } from "react";
import { Slider } from "antd";
import { filterActions } from "../../store/filterSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
const marks = {
  1920: 1920,
  1930: 1930,
  1940: 1940,
  1950: 1950,
  1960: 1960,
  1970: 1970,
  1980: 1980,
  1990: 1990,
  2000: 2000,
  2010: 2010,
  2020: 2020,
};
const YearSlider:FC = () => {
  const dispatch = useAppDispatch();
  const yearSliderFilter = useAppSelector(
    (state) => state.filters.yearSliderFilter
  );

  const onChangeComplete = (value:number[]|undefined) => {
    value && dispatch(filterActions.changeYearFilter(value.join("-")));
  };
  return (
    <>
      <Slider
        marks={marks}
        range
        step={1}
        min={1920}
        max={2024}
        value={yearSliderFilter.split("-").map(Number)}
        onChange={onChangeComplete}
      />
    </>
  );
};
export default YearSlider;

