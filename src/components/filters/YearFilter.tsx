import Filter from "./Filter";
import { filterActions } from "../../store/filterSlice";
import { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";

const YearFilter:FC = () => {
  const years = [
    [2020, 2027],
    [2010, 2019],
    [2000, 2009],
    [1990, 1999],
    [1980, 1989],
    [1970, 1979],
    [1960, 1969],
    [1950, 1959],
    [1940, 1949],
    [1930, 1939],
    [1920, 1929],
    [1910, 1919],
    [1900, 1909],
    [1890, 1899],
  ];
  const yearFilter = useAppSelector((state) => state.filters.yearFilter);
  let options = [{ value: "", label: "Все годы" }];
  options.push(
    ...years.map((year) => {
      let option = { value: year.join("-"), label: `${year[0]}-${year[1]}` };
      return option;
    })
  );

  return (
    <Filter
      options={options}
      setFilter={filterActions.changeYearFilter}
      value={yearFilter}
    />
  );
};
export default YearFilter;
