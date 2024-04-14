import { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { filterActions } from "../../store/filterSlice";
import Filter from "./Filter";

const ProductionFilter:FC = () => {
  let networks = [
    "Кинопоиск",
    "Wink",
    "START",
    "more.tv",
    "HBO",
    "Okko",
    "Premier",
    "Max",
    "Иви",
    "Netflix",
    "Showtime",
    "The CW",
    "YouTube Premium",
    "FX",
    "Amazon Prime Video",
    "Hulu",
    "Starz",
    "AMC",
  ];
  let options = [{ value: "", label: "Любая сеть производства" }];
  options.push(
    ...networks.map((network) => {
      let option = {
        value: network,
        label: network,
      };
      return option;
    })
  );
  const productionFilter = useAppSelector(
    (state) => state.filters.productionFilter
  );
  return (
    <>
      <Filter
        options={options}
        setFilter={filterActions.changeProductionFilter}
        value={productionFilter}
      />
    </>
  );
};
export default ProductionFilter;
