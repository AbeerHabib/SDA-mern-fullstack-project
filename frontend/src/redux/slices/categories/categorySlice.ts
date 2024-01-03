import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Category, CategoryState } from '../../../types/CategoryType'
import api from '../../../api'

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false,
  searchTerm: ''
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (_, {rejectWithValue}) => {
  try {
    const response = await api.get("/categories");
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const addCategory = createAsyncThunk('categories/addCategory', async (name: string, {rejectWithValue}) => {
  try {
    const response = await api.post('/categories', { name });
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ slug, name }: Partial<Category>, {rejectWithValue}) => {
  try {
    const response = await api.put(`/categories/${slug}`, { name });
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (slug: string, {rejectWithValue}) => {
  try {
    await api.delete(`/categories/${slug}`);
    return slug;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    searchCategory: (state, action) => {
      state.searchTerm = action.payload;
    },
    sortCategories: (state, action) => {
      const sortMethod = action.payload;
      if (sortMethod == 'AtoZ') {
        state.categories.sort((a,b) => a.name.localeCompare(b.name)); // Sort the categories name in ascending order
      }
      else if (sortMethod == 'ZtoA') {
        state.categories.sort((a,b) => b.name.localeCompare(a.name)); // Sort the categories name in descending order
      }
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.payload;
      state.isLoading = false;
    })
    .addCase(addCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload.payload);
      state.isLoading = false;
    })
    .addCase(updateCategory.fulfilled, (state, action) => {
      const { slug, name } = action.payload.payload;
      const foundCategory = state.categories.find((category) => category.slug == slug);
      if (foundCategory) {
        foundCategory.name = name;
        foundCategory.slug = slug;
      }
      state.isLoading = false;
    })
    .addCase(deleteCategory.fulfilled, (state, action) => {
      const filterCategories = state.categories.filter((category) => category.slug !== action.payload);
      state.categories = filterCategories;
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

export const { searchCategory, sortCategories } = categorySlice.actions;
export default categorySlice.reducer;