import React, { FC } from "react";
// import type { PaginationProps } from 'antd';

import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { filmsActions } from "../../store/filmsSlice";
import { PaginationProps } from "../models";
import PaginationComponent from "./PaginationComponent";

// interface PagProps{
// pages:number,
// }

// const PaginationComponent: React.FC<PagProps> = () =>  {
const PaginationSearch:FC<PaginationProps> = ({ total }) => {
  const dispatch = useAppDispatch();
  // const {limit, page}=useSelector(state=>state.films)
  const searchLimit = useAppSelector((state) => state.films.searchLimit);
  const searchPage = useAppSelector((state) => state.films.searchPage);

  // const onChange: PaginationProps['onChange'] = (current, pageSize) => {
  const onChange = (current:number, pageSize:number) => {
    // console.log('cur,lim',current, pageSize);
    dispatch(filmsActions.changeSearchLimit(pageSize));
    dispatch(filmsActions.changeSearchPage(current));
  };
  return (
    <>
      <PaginationComponent
        onChange={onChange}
        total={total}
        limit={searchLimit}
        page={searchPage}
        pageSize={[10, 20, 50, 100, 250]}
        changeSize={true}
      />
    </>
  );
};

export default PaginationSearch;
