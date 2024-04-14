import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "./PaginationComponent";
import { filmActions } from "../../store/filmSlice";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { PaginationProps } from "../models";


const PaginationSeasons:FC<PaginationProps> = ({total}) => {
  const dispatch = useAppDispatch();
  const { seasonsPage } = useAppSelector((state) => state.film);
  // console.log('total', total)
  const onChange = (current:number) => {
    dispatch(filmActions.changeSeasonsPage(current));
    // console.log(current)
  };
  return (
    <PaginationComponent
      onChange={onChange}
      pageSize={[10]}
      page={seasonsPage}
      limit={10}
      total={total && total * 10}
      changeSize={false}
    />
  );
};

export default PaginationSeasons;
