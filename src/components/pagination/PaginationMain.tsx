import React, { FC } from "react";
// import type { PaginationProps } from 'antd';

import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
// import { changeLimit, changePage } from '../store/filmsSlice';
import { filmsActions } from "../../store/filmsSlice";
import { PaginationProps } from "../models";
import PaginationComponent from "./PaginationComponent";

// interface PagProps{
// pages:number,
// }

// const PaginationComponent: React.FC<PagProps> = () =>  {
const PaginationMain:FC<PaginationProps> = ({ total }) => {
  const dispatch = useAppDispatch();
  const { limit, page } = useAppSelector((state) => state.films);

  // const onChange: PaginationProps['onChange'] = (current, pageSize) => {
  const onChange = (current:number, pageSize:number) => {
    // console.log('cur,lim',current, pageSize);
    dispatch(filmsActions.changeLimit(pageSize));
    dispatch(filmsActions.changePage(current));
    // setSearchParams(`page=${current}`)
  };
  return (
    <>
      <PaginationComponent
        onChange={onChange}
        total={total}
        limit={limit}
        page={page}
        pageSize={[10, 20, 50, 100, 250]}
        changeSize={true}
      />
    </>
  );
};

export default PaginationMain;
