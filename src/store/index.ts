import { configureStore } from "@reduxjs/toolkit";
// import groupSlice from "./groupSlice";
// import filmsSlice from './filmsSlice.jsx'
import {filmsReducer} from "./filmsSlice";
import {filmReducer} from "./filmSlice";
import chanceSlice from "./chanceSlice";
import {filterReducer} from "./filterSlice";

const store = configureStore({
  reducer: {
    // groups: groupSlice,
    films:filmsReducer,
    film:filmReducer,
    chance:chanceSlice,
    filters:filterReducer,
  },
});

export default store;

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;