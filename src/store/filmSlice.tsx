import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Actors, Review, Seasons, Film, Posters } from "../components/models";
export interface FilmState{
  film: Film|null,
  status: string,
  posters: Posters|null,
  postersStatus: string,
  reviews: Review|null,
  reviewPage:number,
  reviewLimit: number,
  reviewStatus: string,
  actors: Actors|null,
  actorsStatus: string,
  actorsPage: number,
  seasons: Seasons | null,
  seasonsPage: number,
  seasonsStatus: string,
}

const initialState:FilmState = {
  film: null,
  status: "",
  posters: null,
  postersStatus: "",
  reviews: null,
  reviewPage: 1,
  reviewLimit: 1,
  reviewStatus: "",
  actors: null,
  actorsStatus: "",
  actorsPage: 1,
  // actorsLimit:10,
  seasons: null,
  seasonsPage: 1,
  seasonsStatus: "",
};

const TOKEN=process.env.REACT_APP_API_TOKEN || "";

export const fetchFilm = createAsyncThunk<Film,string|undefined, {rejectValue:string}>(
  "film/fetchFilm",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
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
export const fetchPosters = createAsyncThunk<Posters,string|undefined, {rejectValue:string}>(
  "film/fetchPosters",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://api.kinopoisk.dev/v1.4/image?page=1&limit=50&movieId=${id}`,
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

export const fetchReviews = createAsyncThunk<Review, string|undefined, {rejectValue:string, state:{film:FilmState}}>(
  "film/fetchReviews",
  async (id, { rejectWithValue, getState }) => {
    const reviewPage = getState().film.reviewPage;
    const reviewLimit = getState().film.reviewLimit;
    const response = await fetch(
      `https://api.kinopoisk.dev/v1.4/review?page=${reviewPage}&limit=${reviewLimit}&movieId=${id}`,
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

export const fetchActors = createAsyncThunk<Actors,string|undefined, {rejectValue:string, state:{film:FilmState}}>(
  "film/fetchActors",
  async (id, { rejectWithValue, getState }) => {
    const actorsPage  = getState().film.actorsPage;
    const response = await fetch(
      `https://api.kinopoisk.dev/v1.4/person?page=${actorsPage}&limit=10&movies.id=${id}&movies.enProfession=actor`,
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

export const fetchSeasons = createAsyncThunk<Seasons,string|undefined, {rejectValue:string, state:{film:FilmState}}>(
  "film/fetchSeasons",
  async (id, { rejectWithValue, getState }) => {
    const { seasonsPage } = getState().film;
    const response = await fetch(
      `https://api.kinopoisk.dev/v1.4/season?page=1&limit=10&movieId=${id}&number=${seasonsPage}`,
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

const filmSlice = createSlice({
  name: "film",
  initialState,
  reducers: {
    changeReviewLimit(state, action) {
      state.reviewLimit = action.payload;
    },
    changeReviewPage(state, action) {
      state.reviewPage = action.payload;
    },
    clearReviewPage(state) {
      state.reviewPage = 1;
    },
    changeActorsPage(state, action) {
      state.actorsPage = action.payload;
    },
    changeSeasonsPage(state, action) {
      state.seasonsPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilm.fulfilled, (state, action:PayloadAction<Film>) => {
        state.status = "succeeded";
        state.film = action.payload || null;
      })
      .addCase(fetchFilm.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchPosters.pending, (state) => {
        state.postersStatus = "loading";
      })
      .addCase(fetchPosters.fulfilled, (state, action:PayloadAction<Posters>) => {
        state.postersStatus = "succeeded";
        state.posters = action.payload || null;
      })
      .addCase(fetchPosters.rejected, (state) => {
        state.postersStatus = "failed";
      })
      .addCase(fetchReviews.pending, (state) => {
        state.reviewStatus = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action:PayloadAction<Review>) => {
        state.reviewStatus = "succeeded";
        state.reviews = action.payload || null;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.reviewStatus = "failed";
      })
      .addCase(fetchActors.pending, (state) => {
        state.actorsStatus = "loading";
      })
      .addCase(fetchActors.fulfilled, (state, action:PayloadAction<Actors>) => {
        state.actorsStatus = "succeeded";
        state.actors = action.payload || null;
      })
      .addCase(fetchActors.rejected, (state) => {
        state.actorsStatus = "failed";
      })
      .addCase(fetchSeasons.pending, (state) => {
        state.seasonsStatus = "loading";
      })
      .addCase(fetchSeasons.fulfilled, (state, action:PayloadAction<Seasons>) => {
        state.seasonsStatus = "succeeded";
        state.seasons = action.payload || null;
      })
      .addCase(fetchSeasons.rejected, (state) => {
        state.seasonsStatus = "failed";
      });
  },
});


export const { reducer: filmReducer, actions: filmActions } = filmSlice;
