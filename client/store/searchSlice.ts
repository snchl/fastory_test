import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';

export interface SearchState {
  searchLoad: boolean;
}

const initialState: SearchState = {
  searchLoad: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchLoad(state, action) {
      state.searchLoad = action.payload;
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

export const { setSearchLoad } = searchSlice.actions;

export const selectSearchLoad = (state: AppState) => state.search.searchLoad;

export default searchSlice.reducer;
