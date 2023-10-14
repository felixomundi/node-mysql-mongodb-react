import {
createSlice,
//createAsyncThunk
} from '@reduxjs/toolkit'
//import cartItems from '../../cartItem'
//import axios from 'axios'
import { toast } from 'react-toastify';
//const url = 'https://course-api.com/react-useReducer-cart-project';
const cart = JSON.parse(localStorage.getItem('cart'))
const initialState= {
//cartItems:localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): [],
//cartItem:null,
cartItems: cart ? cart : [],
amount: 0,
total: 0,
isLoading:true,
}

// export const getCartItems = createAsyncThunk('cart/getCartItems',
// async () => {
// try {
// const resp = await axios(url)
// // console.log(resp.data)
// return resp.data

// } catch (error) {

// }});

const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {
clearCart: (state) => {
state.cartItems = [];
localStorage.setItem("cart", JSON.stringify(state.cartItems));
toast.error("Cart cleared", { position: "top-center" });
  },
  
addToCart: (state, action) => {
const itemIndex = state.cartItems.findIndex(
(item) => item._id === action.payload._id);
if(itemIndex >= 0) {
state.cartItems[itemIndex].amount += 1;
toast.info(`Increased ${action.payload.name} quantity`, {
position: "top-center",
});

} else{
const tempProduct = { ...action.payload, amount: 1 };
state.cartItems.push(tempProduct);
toast.success(`${action.payload.name} Added product to cart`,
{
position:"top-center",
})
}
localStorage.setItem('cart', JSON.stringify(state.cartItems))
},

decrease(state, action) {
const itemIndex = state.cartItems.findIndex(
(item) => item._id === action.payload._id
);
if (state.cartItems[itemIndex].amount > 1) {
state.cartItems[itemIndex].amount -= 1;

toast.info(`"Decreased ${action.payload.name} quantity`, {
position: "bottom-left",
});
} else if (state.cartItems[itemIndex].amount === 1) {
const nextCartItems = state.cartItems.filter(
(item) => item._id !== action.payload._id
);
state.cartItems = nextCartItems;

toast.error(`${action.payload.name} removed from cart`, {
position: "top-center",
});
}

localStorage.setItem("cart", JSON.stringify(state.cartItems));
},


removeItem: (state, action) => {
const itemId = action.payload._id
state.cartItems = state.cartItems.filter((item) =>
item._id !== itemId);
localStorage.setItem('cart', JSON.stringify(state.cartItems))
toast.error(`${action.payload.name} removed from your cart`, {
position: "top-center",
});
},

calculateTotals: (state) => {
let amount = 0;
let total = 0;
state.cartItems.forEach((item) => {
amount += item.amount;
total += item.amount * item.price;
});
state.amount = amount;
state.total = total;
},
},
extraReducers: {
// [getCartItems.pending]: (state) => {
// state.isLoading = true;
// },
// [getCartItems.fulfilled]: (state, action) => {
// //   console.log(action)
// state.isLoading = false;
// state.cartItems = action.payload;
// },
// [getCartItems.rejected]: (state) => {
// state.isLoading = false;
// },
}
})

//console.log(cartSlice)

export const { clearCart,addToCart,removeItem, decrease,calculateTotals } = cartSlice.actions;

export default cartSlice.reducer


