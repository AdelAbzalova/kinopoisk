import { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { filterActions } from "../../store/filterSlice";
import Filter from "./Filter";

const GenreFilter:FC = () => {
  const genres = useAppSelector((state) => state.filters.genres);
  const genreFilter = useAppSelector((state) => state.filters.genreFilter);
  let options = [{ value: "", label: "Все жанры" }];
  genres &&
    options.push(
      ...genres.map((genre) => {
        let option = { value: genre.name, label: genre.name };
        return option;
      })
    );
  return (
    <>
      <Filter
        options={options}
        setFilter={filterActions.changeGenreFilter}
        value={genreFilter}
      />
    </>
  );
};

export default GenreFilter;
