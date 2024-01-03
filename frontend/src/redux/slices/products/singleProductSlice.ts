import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { singleProductState } from '../../../types/SingleProductType';
import api from '../../../api'

const initialState: singleProductState = {
  product: null,
  error: null,
  isLoading: false,
}

export const fetchSingleProduct = createAsyncThunk('singleProduct/fetchSingleProduct', async (id: string, {rejectWithValue}) => {
  try {
    const response = await api.get(`/products/${id}`);
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.product = action.payload.payload;
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

export default singleProductSlice.reducer;