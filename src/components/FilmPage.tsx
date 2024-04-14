import React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFilm, fetchPosters, fetchReviews, fetchActors, fetchSeasons } from "../store/filmSlice";
import { filmActions } from "../store/filmSlice";
import FilmInfo from "./FilmInfo";
import Loader from "./Loader";
import Error from "./Error";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";


const FilmPage=()=>{
    const {id}= useParams();
    const dispatch=useAppDispatch();

    const {film, status, reviewPage, reviewLimit,actorsPage,seasonsPage}=useAppSelector(state=>state.film);
  useEffect(()=>{

    const promise = dispatch(fetchFilm(id));
    dispatch(filmActions.clearReviewPage())
    return () => {
      promise.abort();
    }

    }, [id, dispatch]);
  useEffect(()=>{
    const promise = dispatch(fetchPosters(id));
    return () => {
      promise.abort()
    }
  }, [id, dispatch]);
  useEffect(()=>{
    const promise = dispatch(fetchReviews(id));
    return () => {
      promise.abort()
    }
  }, [id, dispatch,reviewPage,reviewLimit ]);
  useEffect(()=>{
    const promise = dispatch(fetchActors(id));
    return () => {
      promise.abort()
    }
  }, [id, dispatch,actorsPage ]);
  useEffect(()=>{
    
    const promise = dispatch(fetchSeasons(id));
    return () => {
      promise.abort()
    }
  }, [id, dispatch,seasonsPage ]);

return (
<div>
 
{status==='loading' && <Loader/>}
{status==='failed' && <Error/>}
{status==='succeeded' && <FilmInfo />} 

</div>
)
}

export default React.memo(FilmPage);

