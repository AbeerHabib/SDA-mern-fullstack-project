import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { OrderState } from "../../../types/OrderType";
import api from "../../../api";

const initialState: OrderState = {
  orders: [],
  error: null,
  isLoading: false,
  searchTerm: ''
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, {rejectWithValue}) => {
  try {
    const response = await api.get("/orders");
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    searchOrder: (state, action) => {
      state.searchTerm = action.payload;
    },
    sortOrders: (state, action) => {
      const sortMethod = action.payload;
      if (sortMethod == 'ascending') {
        state.orders.sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // Sort the dates of the orders in ascending order
      }
      else if (sortMethod == 'descending') {
        state.orders.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort the dates of the orders in descending order
      }
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload.payload;
      state.isLoading = false;
    })
    .addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true;
        state.error = null;
      }
    )
    .addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "ERROR!";
      }
    )
  }
})

export const { searchOrder, sortOrders } = orderSlice.actions;
export default orderSlice.reducer;