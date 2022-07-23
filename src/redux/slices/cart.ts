import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDataLS } from '../../utils/localStorageHelper';

export type CartSliceItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  activeSize: number;
  activeType: string;
  count: number;
};

export interface CartState {
  items: CartSliceItem[];
  totalPrice: number;
  totalCount: number;
}

const initialState: CartState = {
  items: getDataLS('cartItems').items || [],
  totalPrice: getDataLS('cartItems').totalPrice || 0,
  totalCount:  getDataLS('cartItems').totalCount || 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartSliceItem>) => {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count && findItem.count++;
      } else {
        state.items.push(action.payload);
      }

      state.totalCount++;
      state.totalPrice = state.items.reduce(
        (sum, item) => (sum += item.price * (item.count)),
        0,
      );
    },
    countInc: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      findItem?.count && findItem.count++;

      state.totalCount++;
      state.totalPrice = state.items.reduce(
        (sum, item) => (sum += item.price * (item.count)),
        0,
      );
    },
    countDec: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.id === action.payload);
      findItem?.count && findItem.count--;

      state.totalCount--;
      state.totalPrice = state.items.reduce(
        (sum, item) => (sum += item.price * (item.count || 0)),
        0,
      );
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalCount -= action.payload.count;
      state.totalPrice -= action.payload.price * action.payload.count;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, removeItem, countInc, countDec, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
