import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../../../api';
import { User, UserState, resetPasswordType } from '../../../types/UserType';

const data = localStorage.getItem('loginData') !== null 
  ? JSON.parse(String(localStorage.getItem('loginData'))) 
  : [];

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  isBanned: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, {rejectWithValue}) => {
  try {
    const response = await api.get("/users");
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
});

export const addUser = createAsyncThunk('users/addUser', async (newUser: Partial<User>, {rejectWithValue}) => {
  try {
    const response = await api.post("/users/register", newUser);
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const activateAccount = createAsyncThunk('users/activateAccount', async (token: string, {rejectWithValue}) => {
  try {
    const response = await api.post("/users/activate-account", { token });
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
});

export const updateUser = createAsyncThunk('users/updateUser', async (userData: Partial<User>, {rejectWithValue}) => {
  try {
    const response = await api.put(`/users/${userData._id}`, userData);
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string, {rejectWithValue}) => {
  try {
    await api.delete(`/users/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message)
  }
});

export const forgotPassword = createAsyncThunk('users/forgotPassword', async (email: string, {rejectWithValue}) => {
  try {
    const response = await api.post("/users/forget-password", {email: email});
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const resetPassword = createAsyncThunk('users/resetPassword', async ({token, password}: resetPasswordType, {rejectWithValue}) => {
  try {
    const response = await api.put("/users/reset-password", { token, password });
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const login = createAsyncThunk('/login', async (userData: object, {rejectWithValue}) => {
  try {
    const response = await api.post("/auth/login", userData);
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    if (error.response.status == 429) { // response status code if the user reached the limited number of requests
      return rejectWithValue(error.response.data);
    }
    else if (error.response.status == 403) { // response status code if user is banned
      return rejectWithValue(error.response.data.message);
    }
    else if (error.response.status == 404) { // response status code if user email is not found
      return rejectWithValue(error.response.data.message);
    }
    else if (error.response.status == 401) { // response status code for invalid user password
      return rejectWithValue(error.response.data.message);
    }
    else {
      console.log(error.response.data.message);
    }
  }
});

export const logout = createAsyncThunk('/logout', async () => {
  try {
    const response = await api.post("/auth/logout");
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
});

export const banUnbanUser = createAsyncThunk('users/banUnbanUser', async ({_id, isBanned}: Partial<User>, {rejectWithValue}) => {
  try {
    const response = await api.put(`/users/ban/${_id}`, { isBanned });
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const grantRole = createAsyncThunk('users/grantRole', async ({_id, isAdmin}: Partial<User>, {rejectWithValue}) => {
  try {
    const response = await api.put(`/users/grantRole/${_id}`, { isAdmin });
    console.log(response.data.message);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    searchUser: (state, action) => {
      state.searchTerm = action.payload;
    },
    sortUsers: (state, action) => {
      const sortMethod = action.payload;
      if (sortMethod == 'AtoZ') {
        state.users.sort((a,b) => a.firstName.localeCompare(b.firstName)); // Sort the names of the users in ascending order
      }
      else if (sortMethod == 'ZtoA') {
        state.users.sort((a,b) => b.firstName.localeCompare(a.firstName)); // Sort the names of the users in descending order
      }
      else if(sortMethod == 'ascendingId') {
        state.users.sort((a,b) => a._id.localeCompare(b._id)); // Sort the id of the users in ascending order
      }
      else if(sortMethod == 'descendingId') {
        state.users.sort((a,b) => b._id.localeCompare(a._id)); // Sort the id of the users in descending order
      }
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.payload;
      state.isLoading = false;
    })
    .addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
      state.isLoading = false;
    })
    .addCase(activateAccount.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      const { firstName, lastName, email, phone, address } = action.payload.payload;
      const foundUser = state.userData;
      if (foundUser) {
        foundUser.firstName = firstName;
        foundUser.lastName = lastName;
        foundUser.email = email;
        foundUser.phone = phone;
        foundUser.address = address;
        
        localStorage.setItem('loginData', JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: foundUser,
        }));
      }
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      const filterUsers = state.users.filter((user) => user._id !== action.payload);
      state.users = filterUsers;
      state.isLoading = false;
    })
    .addCase(forgotPassword.fulfilled, (state, action) => {
      state.users.push(action.payload);
      state.isLoading = false;
    })
    .addCase(resetPassword.fulfilled, (state, action) => {
      state.users = action.payload.payload.password;
      state.isLoading = false;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload.payload;
      localStorage.setItem('loginData', JSON.stringify({
        isLoggedIn: state.isLoggedIn,
        userData: state.userData,
      }));
    })
    .addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      localStorage.setItem('loginData', JSON.stringify({
        isLoggedIn: state.isLoggedIn,
        userData: state.userData,
      }));
    })
    .addCase(banUnbanUser.fulfilled, (state, action) => {
      const { _id, isBanned } = action.payload.payload;
      const foundUser = state.users.find((user) => user._id == _id);
      if(foundUser) {
        foundUser.isBanned = isBanned;
      }
      state.isLoading = false; 
    })
    .addCase(grantRole.fulfilled, (state, action) => {
      const { _id, isAdmin } = action.payload.payload;
      const foundUser = state.users.find((user) => user._id == _id);
      if(foundUser) {
        foundUser.isAdmin = isAdmin;
      }
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

export const { searchUser, sortUsers } = userSlice.actions;
export default userSlice.reducer;