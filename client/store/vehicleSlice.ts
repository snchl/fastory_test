import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import Vehicle from '../types/Vehicle';

export interface VehiclesState {
  vehicles: Vehicle[];
}

const initialState: VehiclesState = {
  vehicles: [],
};

export const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setVehiclesState(state, action) {
      state.vehicles = action.payload || [];
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

export const { setVehiclesState } = vehiclesSlice.actions;

export const selectVehiclesState = (state: AppState) => state.vehicles.vehicles;

export default vehiclesSlice.reducer;