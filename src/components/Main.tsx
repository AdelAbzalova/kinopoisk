import { FC } from 'react';
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import useDebounce from '../hooks/useDebounce';
import { fetchFilms, fetchSearch } from '../store/filmsSlice';
import { fetchCountries } from '../store/filterSlice';
import MainPage from './MainPage';

const Main:FC=()=>{
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
  
    const { limit, page, search, searchPage, searchLimit, mode } = useAppSelector(
      (state) => state.films
    );
    const { countryFilter, ageRatingFilter, yearFilter } = useAppSelector(
      (state) => state.filters
    );
    const debouncedSearch = useDebounce(search, 1000);
  
    // пропускаю первый рендер, чтобы параметры по ссылке не обновились сразу, тк связаны со store
    const firstUpdate = useRef(true);
    useEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
      } else {
        const isCountry = countryFilter ? `&countries.name=${countryFilter}` : "";
        const isAgeRating = ageRatingFilter
          ? `&ageRating=${ageRatingFilter}`
          : "";
        const isYear = yearFilter ? `&releaseYears.start=${yearFilter}` : "";
        setSearchParams(
          `page=${page}&limit=${limit}${isCountry}${isAgeRating}${isYear}`
        );
      }
    }, [limit, page, countryFilter, ageRatingFilter, yearFilter, setSearchParams]);
  
    useEffect(() => {
      let promise:any;
      if (mode === "search") {
        promise = dispatch(fetchSearch());
      } else if (mode === "filter") {
        promise = dispatch(fetchFilms(searchParams));
      }
  
      return () => {
        promise.abort();
      };
    }, [dispatch, searchParams, debouncedSearch, searchLimit, searchPage, mode]);
  
    useEffect(() => {
      dispatch(fetchCountries());
    }, [dispatch]);
    return (
      <>
      <MainPage/>
      </>
    )
}
export default Main;