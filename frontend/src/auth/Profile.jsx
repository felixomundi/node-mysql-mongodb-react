import React, {
useEffect, useState,
Fragment
} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Col, Form } from 'react-bootstrap'
import { profileUpdate } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

export default function Profile() {
const [name, setName] = useState("");
//const [email, setEmail] = useState("");
//const [pic, setPic] = useState('');
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
// const [picMessage, setPicMessage] = useState();

const dispatch = useDispatch();
const navigate = useNavigate();
const { user, isLoading, isError, message } = useSelector((state) => state.auth)


useEffect(() => {
if (!user) {
navigate("/login");
} else {
setName(user.name);
//setEmail(user.email);
// setPic(user.pic);
}
//     if (isError) {
// toast.error(message)
//}
}, [user, isError, message, navigate, dispatch]);

// const postDetails = (pics) => {
// setPicMessage(null);
// if (pics.type === "image/jpeg" || pics.type==="image/jpg" || pics.type === "image/png") {
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
// console.log(pic);
// })
// .catch((err) => {
// console.log(err);
// });
// } else {
// return setPicMessage("Please Select an Image");
// }
// };

const submitHandler = (e) => {
e.preventDefault();
if (password !== confirmPassword) {
toast.error('Passwords do not match!')
}
else {
const userData = {
name,
//email,
// pic,
password,
}

dispatch(profileUpdate(userData));
}
};


if (isLoading) {
return <Spinner />
}

return (
<Fragment>
<section style={{backgroundColor: '#eee'}}>
<div className="container py-5">

<div className="row">
<div className="col">
<nav aria-label="breadcrumb" className="rounded-3 p-3 mb-4">
<ol className="breadcrumb mb-0 bg-white">
<li className="breadcrumb-item"><Link to="#">Home</Link></li>
<li className="breadcrumb-item"><Link to="#">User</Link></li>
<li className="breadcrumb-item active" aria-current="page">User Profile</li>
</ol>
</nav>
</div>
</div>

<div className="row justify-content-center">
<div className="col-lg-8">
<div className="card mb-4">
<div className="card-body">
<Form
onSubmit={submitHandler}
>

<div className="col-sm-3 col-12">
<label className="mb-2 text-dark">Full Name</label>
                                    </div>
                                    
<div className="col-sm-9">
<Form.Control
type="text"
name="name"
value={name}
className="form-control"
onChange={(e) => setName(e.target.value)} />
</div>


{/* <hr />

<div className="row">
<div className="col-sm-3">
<p className="mb-0">Image</p>
</div>
<div className="col-sm-9">
<Form.Control
type="file"
onChange={(e) => postDetails(e.target.files[0])}
name="pic" />
</div>
</div> */}

<p className='text-danger mt-3'>Change Your Password ?</p>
<div className="col-sm-3 col-12 mb-3">
<label className="mb-0">Old Password</label>
</div>
<div className="col-sm-9">
<input type="password"
name="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="form-control mb-0" />
</div>

<Col className="col-sm-3">
<p className="mb-0">Enter New Password</p>
</Col>
<Col className="col-sm-9">
<input className="form-control mb-3"
type="password"
name="confirmpassword" 
value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
/>
</Col>

                                    <Col sm={9}>
<Button type="submit" variant='primary' className="btn btn-primary mb-0">Update Profile</Button>
</Col>

</Form>

</div>

</div>

</div>
</div>
</div>
</section>
</Fragment>
)
}
