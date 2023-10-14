import { useState, useEffect,Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { Button, Form,Container,Row,Card } from 'react-bootstrap'
// import google from '../assets/images/google.png'
// import facebook from '../assets/images/facebook.png' 
import { validateEmail } from '../features/auth/authService'
function Login() {

const [formData, setFormData] = useState({
email: '',
password: '',
})

const { email, password } = formData

const navigate = useNavigate()
const dispatch = useDispatch()

const { user, isLoading, isError, isSuccess, message } = useSelector(
(state) => state.auth
)

useEffect(() => {
if (isError) {
toast.error(message)
}

  if (isSuccess || user) {
  navigate('/')
}

dispatch(reset())
}, [user, isError, isSuccess, message, navigate, dispatch])

const onChange = (e) => {
setFormData((prevState) => ({
...prevState,
[e.target.name]: e.target.value,
}))
}

const onSubmit = (e) => {
e.preventDefault()

// Validate fields here if empty
if (!validateEmail(email)) {
return toast.error("Please enter a valid email");
}
const userData = {
email,
password,
}

dispatch(login(userData))
}

if (isLoading) {
return <Spinner />
}

return (
<Fragment>

    <div style={{
      backgroundColor: 'pink',
maxHeight:'100vh'    }}>
<Container className="py-5 h-100">
<Row className="d-flex justify-content-center align-items-center h-100">
<div className="col-md-6">
<Card className="shadow-2-strong" style={{ borderRadius: '1rem' }}>

<h3 className="mb-3 text-center">Sign in</h3>
<Form onSubmit={onSubmit}>
<div className="form-group mb-3 mx-4">
                  <Form.Control
                    type="email"
                    name="email"
                      value={email} onChange={onChange}
                      placeholder="Enter your email" 
                      className='rounded-pill'
                      />
</div>
              

                  <div className="form-group mb-3 mx-3">
                  <Form.Control
                      type='password'
                      id='password'
                     className='rounded-pill'
name='password'
value={password}
placeholder='Enter password'
onChange={onChange}
/>
</div>
                  <div className="col-md-5 mx-3">                    
<Button className="btn btn-primary btn-lg rounded-pill" type="submit">Login</Button>
</div>
<hr className='mt-2'/>
<sub><Link to="/register" style={{
textDecoration: 'none',
color: 'blue',
padding: '3%',
cursor: 'pointer'
}}>Create an account ?</Link></sub> 
<small><Link to="#" className="btn-sm  rounded-pill">Forgot password</Link></small>

<hr className="my-4"/>

</Form>

</Card>
</div>
</Row>
</Container>
</div> 
   

</Fragment>
)
}

export default Login
