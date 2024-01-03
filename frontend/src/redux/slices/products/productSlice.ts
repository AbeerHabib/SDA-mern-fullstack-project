import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Product, ProductState } from '../../../types/ProductType'
import api from '../../../api'

const initialState: ProductState = {
  products: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  },
  error: null,
  isLoading: false,
  searchTerm: '',
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, {rejectWithValue}) => {
  try {
    const response = await api.get("/products");
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const addProduct = createAsyncThunk('products/addProduct', async (newProduct: Partial<Product>, {rejectWithValue}) => {
  try {
    const response = await api.post("/products", newProduct);
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (productData: Partial<Product>, {rejectWithValue}) => {
  try {
    
    const response = await api.put(`/products/${productData._id}`, productData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string, {rejectWithValue}) => {
  try {
    await api.delete(`/products/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchTerm = action.payload;
    },
    sortProducts: (state, action) => {
      const sortMethod = action.payload;
      if (sortMethod == 'AtoZ') {
        state.products.sort((a,b) => a.name.localeCompare(b.name)); // Sort the names of the products in ascending order
      }
      else if (sortMethod == 'ZtoA') {
        state.products.sort((a,b) => b.name.localeCompare(a.name)); // Sort the names of the products in descending order
      }
      else if(sortMethod == 'lowToHigh') {
        state.products.sort((a,b) => a.price - b.price); // Sort the prices of the products in ascending order
      }
      else if(sortMethod == 'highToLow') {
        state.products.sort((a,b) => b.price - a.price); // Sort the prices of the products in descending order
      }
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.payload.products;
      state.isLoading = false;
    })
    .addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload.payload);
      state.isLoading = false;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
    const updatedProduct = action.payload.payload
    state.products = state.products.map((product) => {
      if (product._id === updatedProduct._id) {
        return { ...product, ...updatedProduct }
      }
      return product
    })
    state.isLoading = false;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      const filterProducts = state.products.filter((product) => product._id !== action.payload);
      state.products = filterProducts;
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

export const { searchProduct, sortProducts } = productSlice.actions;
export default productSlice.reducer;