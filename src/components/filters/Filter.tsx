import { Select } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { filmsActions } from "../../store/filmsSlice";

interface FilterProps{
  options:{
    value:string|number, 
    label:string
  }[], 
  value:string|number,
  setFilter:any,
}

const Filter:FC<FilterProps>=(props)=> {
  const dispatch = useDispatch();
  const onChange = (value:string|number) => {
    dispatch(props.setFilter(value));
    dispatch(filmsActions.changeMode("filter"));
  };
  return (
    <Select
      showSearch
      style={{ width: "100%" }}
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={props.options}
      value={props.value}
    />
  );
}

export default Filter;
