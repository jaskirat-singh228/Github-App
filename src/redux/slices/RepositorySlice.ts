import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: number;
  name: string;
  isFavorite: boolean;
}

const initialState: Item[] = [];

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.isFavorite = !existingItem.isFavorite;
      } else {
        state.push({ ...action.payload, isFavorite: true });
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      return state.filter(item => item.id !== action.payload);
    },
  },
});


export const { addItem, removeItem } = itemSlice.actions;
export default itemSlice.reducer;
