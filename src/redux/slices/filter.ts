import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import qs from 'qs';

export interface FilterState {
  selectedCategory: number;
  selectedSort: number;
  selectedPage: number;
  searchValue: string;
}

export interface ParamsUrl {
  selectedCategory?: number;
  selectedSort?: number;
  selectedPage?: number;
  searchValue?: string;
}

const paramsUrl: ParamsUrl = qs.parse(window.location.search.substring(1));
export const initialState: FilterState = {
  selectedCategory: Number(paramsUrl.selectedCategory) || 0,
  selectedSort: Number(paramsUrl.selectedSort) || 0,
  selectedPage: Number(paramsUrl.selectedPage) || 0,
  searchValue: paramsUrl.searchValue || '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSort: (state, action: PayloadAction<number>) => {
      state.selectedSort = action.payload;
    },
    setSelectedPage: (state, action: PayloadAction<number>) => {
      state.selectedPage = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setSelectedCategory,
  setSelectedSort,
  setSelectedPage,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
