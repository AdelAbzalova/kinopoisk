import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Films } from "../components/models";
// import { useSearchParams } from "react-router-dom";



interface FilmsState{
  films: Films|null,
  status: string,
  limit: number,
  page: number,
  countriesStatus: string,
  search: string,
  searchPage: number,
  searchLimit: number,
  isSearch: boolean,
  isFilter: boolean,
  mode: "filter"|"search",
  previousSearch: string[],
}


const initialState:FilmsState = {
  films: null,
  status: "",
  limit: 10,
  page: 1,
  countriesStatus: "",
  search: "",
  searchPage: 1,
  searchLimit: 10,
  isSearch: false,
  isFilter: true,
  mode: "filter",
  previousSearch: [],
};
const TOKEN=process.env.REACT_APP_API_TOKEN || "";

export const fetchFilms = createAsyncThunk<Films,URLSearchParams, {rejectValue:string,state:{films:FilmsState}}>(
  "films/fetchFilms",
  async (searchParams, { rejectWithValue }) => {
    // const {page, limit}=getState().films;
    // const {countryFilter,ageRatingFilter,yearFilter}=getState().filters;
    // const isCountry =countryFilter ? `&countries.name=${countryFilter}` : "";
    // const isAgeRating = ageRatingFilter? `&ageRating=${ageRatingFilter}` : "";
    // const isYear = yearFilter ? `&releaseYears.start=${yearFilter}` : "";
    // const isSearch=search ? `&query=${search}`:"";
    // const [searchParams, setSearchParams] = useSearchParams();
    // const queryParams = searchParams.get('movie') || '';
    // console.log('qp', queryParams)
    // const API=`https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limit}${isCountry}${isAgeRating}${isYear}`;
    // console.log('searchpar', searchParams)

    // const API = ;
    // console.log("api", API);
    const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie?${searchParams}`, {
      method: "GET",
      headers: {
        "X-API-Key": TOKEN,
        "Content-Type": "application/json",
        //   "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    });
    // console.log('as lim',films.limit);
    if (!response.ok) {
      return rejectWithValue("server error");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchSearch = createAsyncThunk<Films,undefined, {rejectValue:string, state:{films:FilmsState}}>(
  "films/fetchSearch",
  async (_, { rejectWithValue, getState }) => {
    const { searchPage, searchLimit, search } = getState().films;

    const isSearch = search ? `&query=${search}` : "";

    // const API = ;
    // console.log("api", API);
    const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/search?page=${searchPage}&limit=${searchLimit}${isSearch}`, {
      method: "GET",
      headers: {
        "X-API-Key": TOKEN,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return rejectWithValue("server error");
    }
    const data = await response.json();
    return data;
  }
);

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    changeLimit(state, action:PayloadAction<number>) {
      state.limit = action.payload;
    },
    changePage(state, action:PayloadAction<number>) {
      state.page = action.payload;
    },
    changeSearchLimit(state, action:PayloadAction<number>) {
      state.searchLimit = action.payload;
    },
    changeSearchPage(state, action:PayloadAction<number>) {
      state.searchPage = action.payload;
    },
    searchFilm(state, action:PayloadAction<string>) {
      state.search = action.payload;
    },
    changeMode(state, action:PayloadAction<"filter"|"search">) {
      state.mode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilms.fulfilled, (state, action:PayloadAction<Films>) => {
        state.status = "succeeded";
        state.films = action.payload || null;
      })
      .addCase(fetchFilms.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSearch.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.films = action.payload || null;
        let searchTips=localStorage.getItem("searchTip");
        state.previousSearch =
        searchTips ? JSON.parse(searchTips) : [];
        //  console.log(state.previousSearch.length);

        if (!state.previousSearch.includes(state.search)) {
          if (state.previousSearch.length > 20) {
            state.previousSearch.pop();
          }
          state.previousSearch.unshift(state.search);
        }

        localStorage.setItem("searchTip", JSON.stringify(state.previousSearch));
      })
      .addCase(fetchSearch.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { reducer: filmsReducer, actions: filmsActions } = filmsSlice;
