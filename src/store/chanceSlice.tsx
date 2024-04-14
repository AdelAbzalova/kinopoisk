import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Film } from "../components/models";
import { FilterState } from "./filterSlice";

interface ChanceState{
  isAuthorized:boolean,
  randomFilm:Film|null,
  status:string,
}

const initialState:ChanceState = {
    isAuthorized:false,
    randomFilm:null,
    status:'',
}

const TOKEN=process.env.REACT_APP_API_TOKEN || "";

export const fetchRandomFilm = createAsyncThunk<Film,undefined, {rejectValue:string,state:{ filters:FilterState}}>(
'film/fetchRandomFilm', async (_, { rejectWithValue, getState }) => {   
  const {genreFilter, contentFilter, ratingFilter, yearFilter, productionFilter, countryFilter}=getState().filters;
  const isYear=yearFilter? `year=${yearFilter}`:'';
  const isContent=contentFilter? `&type=${contentFilter}`:'';
  const isRating=ratingFilter ? `&rating.kp=${ratingFilter}-10`:'';
  const isGenre=genreFilter ? `&genres.name=${genreFilter}`:'';
  const isCountry=countryFilter? `&countries.name=${countryFilter}`:''
  const isProduction=productionFilter? `&networks.items.name=${productionFilter}`:'';


  let url=`https://api.kinopoisk.dev/v1.4/movie/random?${isYear}${isContent}${isRating}${isGenre}${isCountry}${isProduction}`
  // console.log('url', url)
      const response= await fetch(url, {
          method: "GET",
          headers: {
            "X-API-Key": TOKEN,
            "Content-Type":"application/json"
          },
  
  });
  if(!response.ok){
    // console.log('signalChance', signal)
     return rejectWithValue('server error');
  }
  const data= await response.json();

  // console.log('data', data.id);
  return data.id;
  
  });


const chanceSlice = createSlice({
  name: 'chance',
  initialState,
  reducers: {
    logIn(state){
        state.isAuthorized=true;
    }, 
    logOut(state){
        state.isAuthorized=false
    }, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomFilm.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRandomFilm.fulfilled, (state, action:PayloadAction<Film>) => {
        state.status = 'succeeded';
        state.randomFilm = action.payload || null;

      })
      .addCase(fetchRandomFilm.rejected, (state) => {
        state.status = 'failed';
      })
      
   
  },

});

export default chanceSlice.reducer;
export const {
    logIn, 
    logOut, 
} = chanceSlice.actions;
