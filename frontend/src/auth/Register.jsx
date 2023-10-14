import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
//import ErrorMessage from '../components/ErrorMessage'
import {Button, Card,Col,Row} from 'react-bootstrap'
import { validateEmail } from '../features/auth/authService'
import google from '../assets/images/google.png'
import facebook from '../assets/images/facebook.png'
function Register() {

const [email, setEmail] = useState("");
const [name, setName] = useState("");
//const [pic, setPic] = useState('');
const [password, setPassword] = useState("");
const [confirmpassword, setConfirmPassword] = useState("");

const navigate = useNavigate()
const dispatch = useDispatch()

const { user, isLoading, isError, isSuccess, message } = useSelector(
(state) => state.auth
)

// const postDetails = (pics) => {
// if (
// pics ===""
// ) {
// //return setPicMessage("Please Select an Image");
// return toast.error('Please select an image')
// }
// setPicMessage(null);
// if (pics.type === "image/jpeg" || pics.type === "image/png") {
// const data = new FormData();
// data.append("file", pics);
// data.append("upload_preset", "blogapp");
// data.append("cloud_name", "dsjkwvmyp");
// fetch("https://api.cloudinary.com/v1_1/dsjkwvmyp/image/upload", {
// method: "post",
// body: data,
// })
// .then((res) => res.json())
// .then((data) => {
// setPic(data.url.toString());
// })
// .catch((err) => {
// console.log(err);
// });
// } else {
// return toast.error("Please Select an Image");
// }
// };

useEffect(() => {
if (isError) {
toast.error(message)
}

if (isSuccess || user) {
navigate('/')
}

dispatch(reset())
}, [user, isError, isSuccess, message, navigate, dispatch])



const onSubmit = (e) => {
e.preventDefault()
//validate values
if (!validateEmail(email)) {
toast.error('Please Enter a valid email address.')
}
if (password !== confirmpassword) {
toast.error('Passwords do not match')
} else {
const userData = {
name,
email,
//pic,
password,
}
console.log(userData)
dispatch(register(userData))
}
}

if (isLoading) {
return <Spinner />
}

return (

<div className="container h-75 my-5">
<Row className="d-flex justify-content-center align-items-center">  
<Col md={6}>
<Card className='border-primary'>
<div className="p-5">
<div className="text-center">
<h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
</div>
<form onSubmit={onSubmit}>
<div className="form-group row">
<div className='form-group mb-3'>
<input
//type='text'
className='form-control border-primary'
id='name'
name='name'
type="text"
value={name}
autoFocus
placeholder="Enter name"
onChange={(e) => setName(e.target.value)}
/>
</div>
<div className='form-group mb-3'>
<input
// type='email'
className='form-control border-primary'
autoFocus
id='email'
name='email'
type="email"
value={email}
placeholder="Enter email"
onChange={(e) => setEmail(e.target.value)}
/>
</div>
</div>
<div className="form-group mb-3">
<input
className='form-control border-primary'
id='password'
name='password'
type="password"
value={password}
placeholder="Password"
onChange={(e) => setPassword(e.target.value)}
/>
</div>
<div className='form-group mb-3'>
<input
type='password'
className='form-control border-primary'
id='confirmpassword'
name='confirmpassword'
value={confirmpassword}
placeholder="Confirm Password"
onChange={(e) => setConfirmPassword(e.target.value)}
/>
</div>
{/* 
<div className="form-group mb-3">
{picMessage && (
<ErrorMessage variant="danger">{picMessage}</ErrorMessage>
)}
<label>Profile Picture</label>
<input className='form-control'
onChange={(e) => postDetails(e.target.files[0])}
type="file"
size="sm" 
/>
</div> */}
<Button type="submit" className="btn btn-primary btn-user btn-block">
Register Account
</Button>
<hr/>
<Link to="#" className="btn btn-google btn-user btn-block">
<img src={google} style={{width:'30px'}} alt=""/> Register with Google
</Link>
<Link to="#" className="btn btn-facebook btn-user btn-block">
<img src={facebook} style={{width:'30px'}} alt=""/>  Sign in with Facebook
</Link>
</form>
<hr/>
<div className="text-center">
<Link className="small" to="">Forgot Password?</Link>
</div>
<div className="text-center">
<Link className="small" to="/login">Already have an account? Login!</Link>
</div>
</div>
</Card>
</Col>

</Row>
</div>

)
}

export default Register
