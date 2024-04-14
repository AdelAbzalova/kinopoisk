import Filter from "./Filter";
import { filterActions } from "../../store/filterSlice";
import { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";

const CountryFilter:FC = () => {
  const countries = useAppSelector((state) => state.filters.countries);
  const countryFilter = useAppSelector((state) => state.filters.countryFilter);

  let options = [{ value: "", label: "Все страны" }];
  countries &&
    options.push(
      ...countries.map((country) => {
        let option = { value: country.name, label:country.name };
        return option;
      })
    );
  return (
    <Filter
      options={options}
      setFilter={filterActions.changeCountriesFilter}
      value={countryFilter}
    />
  );
};
export default CountryFilter;
