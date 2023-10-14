import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom"
// import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from "features/auth/authSlice"
import { Spinner } from 'react-bootstrap';
import { login } from "features/auth/authSlice"

function Login() {

  
  const [formData, setFormData] = useState({
    
    email: '',
    password: '',
  
    
  })

  const {  email, password } = formData;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isAuthenticated, loading } = useSelector(
    (state) => state.auth
  )
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }  
  
  useEffect(() => {
   
    if (isAuthenticated) {      
    dispatch(reset())
      navigate('/dashboard')
    }

  }, [isAuthenticated,  navigate, dispatch])


  
  const onSubmit = (e) => {
    e.preventDefault()    
      const userData = {     
        email,
        password,
      }
   
      dispatch(login(userData))
    
  }

  if (loading) {
  return <Spinner/>
  } 
  
  return (
    
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">

      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <Form onSubmit={onSubmit}>

<div className="md-form mb-4">
<label className="form-label" htmlFor="email">Email address</label>
<input type="email" name="email" required id="email" value={email} onChange={onChange} className="form-control form-control-lg" />
</div>

<div className=" md-form mb-4">
<label className="form-label" htmlFor="password">Password</label>
<input type="password" name="password" required id="password" value={password} onChange={onChange} className="form-control form-control-lg" />
            </div>
            
            {loading ? (
            <Spinner/>
            ) : (
                
<Button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</Button>
            )}
            
<Link className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#3b5998" }} to="#!"
role="button">
<i className="fab fa-facebook-f me-2"></i>Continue with Facebook
</Link>
<Link className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#55acee" }} to="#!"
role="button">
<i className="fab fa-twitter me-2"></i>Continue with Twitter</Link>
</Form>
      </div>
    </div>
  </div>

  );
}

export default Login;