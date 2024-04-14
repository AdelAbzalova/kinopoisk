import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState{
genres: {
  name:string
}[]|null
countries:{
name:string,
}[]|null, 
genreFilter:string, 
contentFilter: string,
ratingFilter: string|number,
yearFilter: string,
productionFilter: string,
countryFilter: string,
ageRatingFilter: string|number,
yearSliderFilter: string,
isFilter: boolean,
}

const initialState:FilterState = {
  genres: null,
  countries: null,
  genreFilter: "",
  contentFilter: "",
  ratingFilter: "",
  yearFilter: "",
  productionFilter: "",
  countryFilter: "",
  ageRatingFilter: "",
  yearSliderFilter: "1920-2024",
  isFilter: false,
};
const TOKEN=process.env.REACT_APP_API_TOKEN || "";

export const fetchGenres = createAsyncThunk(
  "filters/fetchGenres",
  async (_, { rejectWithValue }) => {

    
    const response = await  fetch(
      `https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name`,
      {
        method: "GET",
 
        headers: {
          "X-API-Key": TOKEN,
          "Content-Type": "application/json",
        } ,
    }
    );
    if (!response.ok) {
      return rejectWithValue("server error");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchCountries = createAsyncThunk(
  "films/fetchCountries",
  async (_, { rejectWithValue }) => {
    const response = await fetch(
      "https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name",
      {
        method: "GET",
        headers: {
          "X-API-Key": TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      return rejectWithValue("server error");
    }
    const data = await response.json();
    return data;
  }
);

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeGenreFilter(state, action:PayloadAction<string>) {
      state.genreFilter = action.payload;
    },
    changeContentFilter(state, action:PayloadAction<string>) {
      state.contentFilter = action.payload;
    },
    changeRatingFilter(state, action:PayloadAction<string|number>) {
      state.ratingFilter = action.payload;
    },
    changeProductionFilter(state, action:PayloadAction<string>) {
      state.productionFilter = action.payload;
    },
    changeCountriesFilter(state, action:PayloadAction<string>) {
      state.countryFilter = action.payload;
    },
    changeAgeRatingFilter(state, action:PayloadAction<string|number>) {
      state.ageRatingFilter = action.payload;
    },
    changeYearFilter(state, action:PayloadAction<string>) {
      state.yearFilter = action.payload;
      state.yearSliderFilter = action.payload;
    },
    clearFilters(state) {
      state.ageRatingFilter = "";
      state.countryFilter = "";
      state.yearFilter = "";
    },
    clearChanceFilters(state) {
      state.genreFilter = "";
      state.contentFilter = "";
      state.ratingFilter = "";
      state.productionFilter = "";
      state.countryFilter = "";
      state.yearFilter = "";
      state.yearSliderFilter = "1920-2024";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.fulfilled, (state, action:PayloadAction<{name:string}[]>) => {
        state.genres = action.payload || null;
      })
      .addCase(fetchCountries.fulfilled, (state, action:PayloadAction<{name:string}[]|null>) => {
        state.countries = action.payload || null;
      });
  },
});

export const { reducer: filterReducer, actions: filterActions } = filterSlice;
