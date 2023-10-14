import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header/Header'
import Dashboard from './pages/Dashboard'
import Login from './auth/Login'
import Register from './auth/Register'
import Profile from './auth/Profile'
import { Fragment } from 'react'
import GoalForm from './components/GoalForm'
import Contact from './pages/contact/Contact'
import Cart from './pages/Cart'
import ProductDetail from './pages/productdetail/Detail'
import OurServices from './pages/services/OurServices'
import Footer from './pages/footer/Footer'
import Pricing from './pages/pricing/Pricing'
import Checkout from './pages/Checkout'
import Products from './admin/products/Products'
import AddProduct from './admin/products/AddProduct'
import EditProduct from './admin/products/EditProduct'
import Users from './admin/users/Users'
import UserDetail from './admin/users/UserDetail'
function App() {

  return (
    <Fragment>
      <Router>
        <div className='container-fluid' style={{ maxHeight:'100vh' }}>        
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/create' element={<GoalForm />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/cart' element={<Cart />} />           
            <Route path='/detail/:id' element={<ProductDetail />} />
            <Route path='/services' element={<OurServices />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:id' element={<EditProduct />} />
            <Route path='/addproduct' element={<AddProduct />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<UserDetail/>} />
          </Routes>
          <Footer/>
        </div>
      </Router>
      <ToastContainer />
    </Fragment>
  )
}
export default App
