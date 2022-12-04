import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';
import People from '../types/People';

export interface PeoplesState {
  peoples: People[];
}

const initialState: PeoplesState = {
  peoples: [],
};

export const peoplesSlice = createSlice({
  name: 'peoples',
  initialState,
  reducers: {
    setPeoplesState(state, action) {
      state.peoples = action.payload || [];
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

export const { setPeoplesState } = peoplesSlice.actions;

export const selectPeoplesState = (state: AppState) => state.peoples.peoples;

export default peoplesSlice.reducer;
