import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom"
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from "features/auth/authSlice"
import { Spinner } from 'react-bootstrap';
import { register } from "features/auth/authSlice"

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2:'',
    
  })

  const { name, email, password,password2 } = formData;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { registered, loading } = useSelector(
    (state) => state.auth
  )
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }  
  
  useEffect(() => {
   
    if (registered) {
      navigate('/dashboard')
    }

    dispatch(reset())
  }, [registered,  navigate, dispatch])


  
  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
  }

  if (loading) {
  return <Spinner></Spinner>
}
  return (
    
  <div className="container py-5">
    <div className="row d-flex align-items-center justify-content-center h-100">

      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <Form onSubmit={onSubmit}>
          
          <div className="md-form mb-4">
          <label className="form-label" htmlFor="name">Name</label>
          <input type="text" id="name"  required name='name' value={name} onChange={onChange} className="form-control form-control-lg" />

            </div>
            

            <div className="md-form mb-4">
          <label className="form-label" htmlFor="email">Email address</label>
          <input type="email" name="email" required id="email" value={email} onChange={onChange} className="form-control form-control-lg" />

          </div>
              <div className=" md-form mb-4">
              <label className="form-label" htmlFor="password">Password</label>
            <input type="password" name="password" required id="password" value={password} onChange={onChange} className="form-control form-control-lg" />
            
            </div>
            
            <div className=" md-form mb-4">
              <label className="form-label" htmlFor="password2">Confirm Password</label>
            <input type="password" name="password2"  required value={password2}  onChange={onChange} id="password2" className="form-control form-control-lg" />
            
          </div>
         
          <Button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</Button>
{loading && <Spinner></Spinner>}
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

export default Register;