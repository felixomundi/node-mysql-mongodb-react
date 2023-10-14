import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import cartReducer from '../features/cart/cartSlice'
import modalReducer from '../features/modal/modalSlice'
import productReducer from '../features/products/productSlice'
import contactReducer from '../features/contact/contactSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    cart: cartReducer,
    modal: modalReducer,
    products: productReducer,
    contact: contactReducer,
  
  },
})
