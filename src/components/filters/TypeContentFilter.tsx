import { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { filterActions } from "../../store/filterSlice";
import Filter from "./Filter";

const TypeContentFilter:FC = () => {
  const contentFilter = useAppSelector((state) => state.filters.contentFilter);
  const options = [
    {
      value: "",
      label: "Любой тип контента",
    },
    {
      value: "movie",
      label: "Фильм",
    },
    {
      value: "tv-series",
      label: "Сериал",
    },
  ];
  return (
    <>
      <Filter
        options={options}
        setFilter={filterActions.changeContentFilter}
        value={contentFilter}
      />
    </>
  );
};
export default TypeContentFilter;
