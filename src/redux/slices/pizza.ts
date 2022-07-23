import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';

type PizzaItem = {
  category: number;
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

enum Status {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaState {
  items: PizzaItem[];
  status: Status;
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, sortBy, order, search, page } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://62c2b2a5ff594c656762b994.mockapi.io/items?limit=4&${page}&${search}&${category}&${sortBy}&${order}`,
    );

    return data;
  },
);

const initialState: PizzaState = {
  items: [],
  status: Status.PENDING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.PENDING;
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        console.log('Error loading pizzas');
        state.status = Status.ERROR;
      });
  },
});

export default pizzaSlice.reducer;
