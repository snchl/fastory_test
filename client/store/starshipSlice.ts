import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import Starship from '../types/Starship';

export interface StarshipsState {
  starships: Starship[];
}

const initialState: StarshipsState = {
  starships: [],
};

export const starshipsSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {
    setStarshipsState(state, action) {
      state.starships = action.payload || [];
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

export const { setStarshipsState } = starshipsSlice.actions;

export const selectStarshipsState = (state: AppState) => state.starships.starships;

export default starshipsSlice.reducer;