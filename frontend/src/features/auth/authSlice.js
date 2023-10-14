import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//import axios from 'axios'
import authService from './authService'
import {toast} from 'react-toastify'
// Get user from localStorage

const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
  user: user ? user : null,
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })


// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
});


export const profileUpdate = createAsyncThunk('auth/profile', async (user, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await authService.profileUpdate(user, token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
});

export const updateUserDetails = createAsyncThunk('auth/updateUserDetails',
  async ({ id, updatedUserData},thunkAPI) => {
try {
  const token = thunkAPI.getState().auth.user.token
    return await authService.updateUserDetails(updatedUserData, id, token)
} catch (error) {
  const message = (error.response && error.response.data && error.register.data.message)
  || error.message || error.toString()
return thunkAPI.rejectWithValue(message)
}  
});

// Fetch all users by admin 
export const getUsers = createAsyncThunk('auth/all',
  async(_, thunkAPI) => {
  try {    
    const token = thunkAPI.getState().auth.user.token
    return await authService.getUsers(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
});



// Get a User
export const getUser = createAsyncThunk(
  "auth/:id",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.getUser(id,token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete User by admin
export const deleteUser = createAsyncThunk('auth/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await authService.deleteUser(id, token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })      
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
    .addCase(profileUpdate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(profileUpdate.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        toast.success('Profile updated successfully')
      })
      .addCase(profileUpdate.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;       
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
    // get single User
    .addCase(getUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;      
      state.user = action.payload
    })
    .addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    .addCase(updateUserDetails.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
     state.users = state.users.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      toast.success('User update Success')
      
    })
    .addCase(updateUserDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    })
    .addCase(deleteUser.pending, (state) => {
      state.isLoading = true
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.users = state.users.filter(
        (item) => item._id !== action.payload.id)
      toast.success('User deleted successfully')
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      toast.error(action.payload)
    })
    
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
