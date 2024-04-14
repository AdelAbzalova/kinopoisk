import React, { FC, useState } from "react";
import { Input, Space, AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { filmsActions } from "../store/filmsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
const { Search } = Input;
const SearchComponent:FC = () => {
  const search = useAppSelector((state) => state.films.search);
  const previousSearch = useAppSelector((state) => state.films.previousSearch);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const mode = useAppSelector((state) => state.films.mode);

  const dispatch = useAppDispatch();
  const onChange = (value:string) => {
    dispatch(filmsActions.searchFilm(value));

    if (value === "") {
      dispatch(filmsActions.changeMode("filter"));
    } else {
      dispatch(filmsActions.changeMode("search"));
    }
    setIsTipsOpen(true);
  };
  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        onChange={(e) => onChange(e.target.value)}
        value={search}
        onPressEnter={() => setIsTipsOpen(false)}
      />

      {search && isTipsOpen && mode === "search" && (
        <div
          style={{
            width: 200,
            backgroundColor: "white",
            position: "absolute",
            zIndex: 2,
            color: "black",
            borderRadius: 10,
            boxShadow: "1px 1px 5px grey",
            textAlign: "center",
          }}
        >
          {previousSearch.filter((str) => str.includes(search)).length == 0 && (
            <div>{search}</div>
          )}
          {previousSearch
            .filter((str) => str.includes(search))
            .map((previous, index) => (
              <div
                key={index}
                style={{ textAlign: "center" }}
                onClick={() => {
                  onChange(previous);
                  setIsTipsOpen(false);
                }}
              >
                {previous}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
