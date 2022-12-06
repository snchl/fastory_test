import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import Film from '../types/Film';

export interface FilmsState {
  films: Film[];
}

const initialState: FilmsState = {
  films: [],
};

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilmsState(state, action) {
      state.films = action.payload || [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});

export const { setFilmsState } = filmsSlice.actions;

export const selectFilmsState = (state: AppState) => state.films.films;

export default filmsSlice.reducer;