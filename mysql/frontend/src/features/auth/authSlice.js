import {  createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';
import { response } from 'express';

export const BACKEND_URL = "http://localhost:5000";


const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  // isAuthenticated: false, 
  user: user ? {isAuthenticated:true, user} : {isAuthenticated:false, user:null},
	loading: false,
  registered: false,
  
};


// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const headers = {
        Accept: "application/json",
        'Content-Type': 'application/json',
    } 
      const response = await axios.post(
        `${BACKEND_URL}/api/users/register`,
        userData,
        { withCredentials: true },
        headers,
      );
     
       
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }


      return response.data;
      
    } catch (error) {
      toast.error(error.response.data)
      return thunkAPI.rejectWithValue(error.response.data);
      // omundifelix30@gmail.com
    }
  }
)



// Register user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const headers = {
        Accept: "application/json",
        'Content-Type': 'application/json',
    } 
      const response = await axios.post(
        `${BACKEND_URL}/api/users/login`,
        userData,
        { withCredentials: true },
        headers,
      );
     
      
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }


      return response.data;
    
    } catch (error) {
      toast.error(error.response.data)
      return thunkAPI.rejectWithValue(error.response.data);
    
    }
  }
)


// Logout User
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
  try {
     await axios.get(`${BACKEND_URL}/api/users/logout`);
//     if (response.statusText === 200) {
//       localStorage.removeItem("user")
// }
  } catch (error) {
    toast.error(error.response.data)
      return thunkAPI.rejectWithValue(error.response.data);
  }
});



// Get Login Status
export const getLoginStatus = createAsyncThunk(
  "auth/loggedin",
  async(_,thunkAPI) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data)
    return thunkAPI.rejectWithValue(error.response.data)
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    reset: (state) => {
      state.loading = false;
      state.registered = false;
    },

    setLogin(state, action) {
      state.isAuthenticated = action.payload;
    },
   
  },
  extraReducers: (builder) => {
    builder
    .addCase(register.pending, (state) => {
      state.loading = true
    })
    .addCase(register.fulfilled, (state,action) => {
      state.loading = false
      state.registered = true
      state.user= action.payload
      toast.success("Register successful")
        })
    .addCase(register.rejected, (state) => {
      state.loading = false
      state.user = null
    })
    .addCase(login.pending, state => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state,action )=> {
      state.loading = false;
      state.isAuthenticated = true;   
      state.user = action.payload
      toast.success("Login successful")

    })
    .addCase(login.rejected, state => {
      state.loading = false;
    })

    .addCase(logout.pending, state => {
      state.loading = true;
    })
    .addCase(logout.fulfilled, (state,action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      toast.success("Logout successfully")
    })
    .addCase(logout.rejected, state => {
      state.loading = false;
    })

  },
});

export const { reset,setLogin } = authSlice.actions;


export default authSlice.reducer;
