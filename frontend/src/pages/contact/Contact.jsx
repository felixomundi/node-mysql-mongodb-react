import React, { useState,Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { createContact, reset } from '../../features/contact/contactSlice' 
import Spinner from '../../components/Spinner'
const Contact = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
const {isLoading, isError } = useSelector(state => state.contact);
const{ user }= useSelector(state=> state.auth)
const [subject, setSubject] = useState("");
const [message, setMessage] = useState("");
const contactData = {
subject,
message,
};

useEffect(() => {
if (isError) {        
toast.error(message);
}
if(!user) {
navigate('/login')
}
if(user && user.role !== "user") {
navigate('/')
}
}, [user,navigate,isError,message]);


const sendEmail = async (e) => {
e.preventDefault();
    dispatch(createContact(contactData, toast))
    dispatch(reset())
navigate('/')
};

if (isLoading) {
return(<Spinner/>)
}

return (
<Fragment>
<div>
<div className="container-fluid bg-light">
<div className="container">
<nav className="breadcrumb bg-transparent mt-2 pt-2">
<Link className="breadcrumb-item" to="#">Home</Link>
<span className="breadcrumb-item active">Contact</span>
</nav>
</div>
</div>

<div className="container-fluid py-3">
<div className="container">
<div className="bg-light py-2 px-4 mb-3">
<h3 className="m-0">Contact Us For Any Queries</h3>
</div>
<div className="row">
<div className="col-md-5">
<div className="bg-light mb-3" style={{ padding: '30px' }}>
<h6 className="font-weight-bold">Get in touch</h6>
<p>Reach through the following means</p>
<div className="d-flex align-items-center mb-3">
<i className="fa fa-2x fa-map-marker-alt text-dark mr-3"></i>
<div className="d-flex flex-column">
<h6 className="font-weight-bold">Our Office</h6>
<p className="m-0">123 Street, New York, USA</p>
</div>
</div>

<div className="d-flex align-items-center mb-3">
<i className="fa fa-2x fa-envelope-open text-dark mr-3"></i>
<div className="d-flex flex-column">
<h6 className="font-weight-bold">Email Us</h6>
<p className="m-0">info@example.com</p>
</div>
</div>
<div className="d-flex align-items-center">
<i className="fas fa-2x fa-phone-alt text-dark mr-3"></i>
<div className="d-flex flex-column">
<h6 className="font-weight-bold">Call Us</h6>
<p className="m-0">+012 345 6789</p>
</div>
</div>
<div className="d-flex align-items-center">
<i className="fas fa-2x fa-clock text-dark mr-3"></i>
<div className="d-flex flex-column">
<h6 className="font-weight-bold">Working Hours</h6>
<select className="form-control"><option value="">Select</option>
<option value="Monday">8.00 a.m - 4.00pm</option>
<option value="Tuesday">8.00 a.m - 4.00pm</option>
<option value="Wedneday">8.00 a.m - 4.00pm</option>
<option value="Thurday">8.00 a.m - 4.00pm</option>
<option value="Friday">8.00 a.m - 4.00pm</option>
</select>
</div>
</div>
</div>
</div>
<div className="col-md-7">
<div className="contact-form bg-light mb-3" style={{ padding: '30px' }}>
<div id="success"></div>
<form onSubmit={sendEmail}>

{/* 
<div className="control-group">
<input type="text" className="form-control p-2" id="name" placeholder="Your Name" required="required" data-validation-required-message="Please enter your name" />
<p className="help-block text-danger"></p>
</div>


<div className="control-group">
<input type="email" className="form-control p-2" id="email" placeholder="Your Email" required="required" data-validation-required-message="Please enter your email" />
<p className="help-block text-danger"></p>
</div> */}


<div className="control-group">
<input type="text" className="form-control p-4" 
id="subject"
placeholder="Subject"
required="required"

value={subject}
onChange={(e) => setSubject(e.target.value)}
/>
<p className="help-block text-danger"></p>
</div>
<div className="control-group">
<textarea className="form-control" rows="4" id="message"
placeholder="Message"
required="required"
value={message}
onChange={(e) => setMessage(e.target.value)}
></textarea>
<p className="help-block text-danger"></p>
</div>
<div>
<button className="btn btn-primary font-weight-semi-bold px-4" style={{ height: '50px' }} type="submit" id="sendMessageButton">Send Message</button>
</div>
</form>
</div>
</div>
</div>
</div>
</div>
</div>
</Fragment>  
)
}

export default Contact