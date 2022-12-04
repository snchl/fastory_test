import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import Specy from '../types/Specy';

export interface SpeciesState {
  species: Specy[];
}

const initialState: SpeciesState = {
  species: [],
};

export const speciesSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {
    setSpeciesState(state, action) {
      state.species = action.payload || [];
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

export const { setSpeciesState } = speciesSlice.actions;

export const selectSpeciesState = (state: AppState) => state.species.species;

export default speciesSlice.reducer;