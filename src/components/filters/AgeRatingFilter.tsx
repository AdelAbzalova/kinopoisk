import Filter from "./Filter";
import { filterActions } from "../../store/filterSlice";
import { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";

const AgeRatingFilter:FC = () => {
  const ages = [0, 6, 12, 16, 18];
  const ageRatingFilter = useAppSelector((state) => state.filters.ageRatingFilter);
  let options:{
    value:string|number, 
    label:string
  }[] = [{ value: "", label: "Любой возраст" }];
  options.push(
    ...ages.map((age) => {
      let option = { value: age, label: `${age}+` };
      return option;
    })
  );
  return (
    <Filter
      options={options}
      setFilter={filterActions.changeAgeRatingFilter}
      value={ageRatingFilter}
    />
  );
};
export default AgeRatingFilter;
