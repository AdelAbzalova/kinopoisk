import React, { FC } from "react";
// import type { PaginationProps } from 'antd';

import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../hooks/hooks";
// import { changeActorsPage, changeActorsLimit } from '../store/filmSlice';
import { filmActions } from "../../store/filmSlice";
import { PaginationProps } from "../models";
import PaginationComponent from "./PaginationComponent";

// const PaginationComponent: React.FC<PagProps> = () =>  {
const PaginationActors:FC<PaginationProps> = ({ total }) => {
  const dispatch = useDispatch();
  const { actorsPage } = useAppSelector((state) => state.film);

  // const onChange: PaginationProps['onChange'] = (current, pageSize) => {
  const onChange = (current:number) => {
    // console.log('cur,lim',current, pageSize);
    // dispatch(filmActions.changeActorsLimit(pageSize));
    dispatch(filmActions.changeActorsPage(current));
  };
  return (
    <PaginationComponent
      onChange={onChange}
      total={total}
      limit={10}

      page={actorsPage}
      pageSize={[1, 5, 10, 20, 50]}
      changeSize={false}
    />
  );
};
export default PaginationActors;
