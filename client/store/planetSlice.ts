import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import Planet from '../types/Planet';

export interface PlanetsState {
  planets: Planet[];
}

const initialState: PlanetsState = {
  planets: [],
};

export const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    setPlanetsState(state, action) {
      state.planets = action.payload || [];
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

export const { setPlanetsState } = planetsSlice.actions;

export const selectPlanetsState = (state: AppState) => state.planets.planets;

export default planetsSlice.reducer;