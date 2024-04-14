
import React, { FC } from 'react';
// import type { PaginationProps } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { filmActions } from '../../store/filmSlice';
import { PaginationProps } from '../models';
import PaginationComponent from './PaginationComponent';


// const PaginationComponent: React.FC<PagProps> = () =>  {
    const PaginationReview:FC<PaginationProps> = ({total}) =>  {
    const dispatch=useAppDispatch();
    const reviewPage=useAppSelector(state=>state.film.reviewPage)
    const  reviewLimit=useAppSelector(state=>state.film.reviewLimit)

// const onChange: PaginationProps['onChange'] = (current, pageSize) => {
  const onChange = (current:number, pageSize:number) => {
  dispatch(filmActions.changeReviewLimit(pageSize));
  dispatch(filmActions.changeReviewPage(current));
  
};
return (
    <PaginationComponent onChange={onChange} total={total} limit={reviewLimit} page={reviewPage} pageSize={[1,5,10,20,50]} changeSize={true}/>
)
}
export default PaginationReview;