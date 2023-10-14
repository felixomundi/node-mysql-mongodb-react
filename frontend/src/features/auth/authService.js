import axios from 'axios'

const API_URL = '/api/users/'


export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//Update user profile
const profileUpdate = async (userData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + 'profile', userData, config)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data)) 
  }
  return response.data
}


//All Users by admin

const getUsers = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}


//Get single user by admin
const getUser = async (id, token ) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + id, config);
  return response.data;
};



// Update Product by admin
const updateUserDetails = async (updatedUserData,id,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.patch(API_URL + id, updatedUserData,config);
  return response.data;
  
};


// Delete user by admin
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + userId, config)

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
  profileUpdate,
  getUsers,
  getUser,
  updateUserDetails,
  deleteUser,
  
}

export default authService
