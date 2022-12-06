import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { filmsSlice } from './filmSlice';
import { peoplesSlice } from './peopleSlice';
import { planetsSlice } from './planetSlice';
import { searchSlice } from './searchSlice';
import { speciesSlice } from './specySlice';
import { starshipsSlice } from './starshipSlice';
import { vehiclesSlice } from './vehicleSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      [searchSlice.name]: searchSlice.reducer,
      [filmsSlice.name]: filmsSlice.reducer,
      [peoplesSlice.name]: peoplesSlice.reducer,
      [planetsSlice.name]: planetsSlice.reducer,
      [speciesSlice.name]: speciesSlice.reducer,
      [starshipsSlice.name]: starshipsSlice.reducer,
      [vehiclesSlice.name]: vehiclesSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
