import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';

export interface SearchState {
  load: boolean
}

const initialState: SearchState = {
  load: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchLoadState(state, action) {
      state.load = action.payload;
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

export const { setSearchLoadState } = searchSlice.actions;

export const selectSearchLoadState = (state: AppState) => state.search.load;

export default searchSlice.reducer;