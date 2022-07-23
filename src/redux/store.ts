import { configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';

import filter from './slices/filter';
import cart from './slices/cart';
import pizza from './slices/pizza';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
