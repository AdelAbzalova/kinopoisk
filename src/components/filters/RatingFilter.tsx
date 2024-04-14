import Filter from "./Filter";
import { filterActions } from "../../store/filterSlice";
import { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";


const RatingFilter:FC = () => {
  const ratingFilter = useAppSelector((state) => state.filters.ratingFilter);

  let options:{
    value:string|number, 
    label:string,
  }[] = [{ value: "", label: "Любой рейтинг" }];
  options.push(
    ...[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((elem) => {
      let option = {
        value: elem,
        label: `от ${elem}`,
      };
      return option;
    })
  );
  return (
    <>
      <Filter
        options={options}
        setFilter={filterActions.changeRatingFilter}
        value={ratingFilter}
      />
    </>
  );
};
export default RatingFilter;
