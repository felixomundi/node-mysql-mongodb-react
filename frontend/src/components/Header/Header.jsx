import React, { Fragment, useEffect } from 'react'
import { Nav,Navbar,Button,NavDropdown,Form,Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import { calculateTotals } from '../../features/cart/cartSlice'
import cartIcon from '../../assets/images/cartIcon.png'
export default function Header() {

const navigate = useNavigate()
const dispatch = useDispatch()
const { user } = useSelector((state) => state.auth)
const cart = useSelector((state) => state.cart)
useEffect(() => {
dispatch(calculateTotals())
},[cart,dispatch])

const onLogout = () => {
dispatch(logout())
dispatch(reset())
navigate('/')
}
return (
<Navbar bg="dark" variant='dark' collapseOnSelect sticky='top' expand="lg">
<Container fluid>
{user &&
<Navbar.Brand as={Link} to="/">Brand</Navbar.Brand>}

<Navbar.Toggle //aria-controls="navbarScroll" 
aria-controls="responsive-navbar-nav" 
/>
<Navbar.Collapse
id="responsive-navbar-nav"
//id="navbarScroll"
>
{user ? (
<Fragment>
<Nav
className="me-auto"
style={{ maxHeight: '50px' }} >

{/* user routes  */}
{user && user.role === "user"
&& (
<Fragment>
<NavDropdown title="Admin"
id="collasible-nav-dropdown"
//id="navbarScrollingDropdown"
active>
<NavDropdown.Item as={Link} to="/pricing" >Pricing</NavDropdown.Item>
<NavDropdown.Item as={ Link} to="/services">
Services
</NavDropdown.Item>

<NavDropdown.Item to="#action5" >
Something else here
</NavDropdown.Item>
</NavDropdown>
<Nav.Link as={Link} to="/cart" >
<img  alt=""  src={cartIcon} style={{ width:'30px' }} className="text-primary"></img>
<span className="badge text-white border border-secondary rounded-circle ml-1" style={{ paddingBottom: '2px',fontSize:'15px' }}>{cart.amount}</span>


</Nav.Link>
<Nav.Link as={Link} to="/create" style={{ color: '#ffff' }}>Add Blog</Nav.Link>

<Nav.Link as={Link} to="/contact" style={{ color: '#ffff' }}>
Contact
</Nav.Link>
{/* <Nav.Link as={Link} to="/products" style={{ color: '#ffff' }}>
Product
</Nav.Link> */}
<Form className="d-flex">
<Form.Control
type="search"
placeholder="Search"
className="me-2"
aria-label="Search"
/>
<Button //variant="outline-success" 
bg="light"
><i className='fa fa-search'></i></Button>
</Form>
</Fragment>
)}

{/* user routes */}

{/* admin routes */}
{user && user.role === "admin" &&
(
<Fragment>    

<NavDropdown title="Admin"
id="collasible-nav-dropdown"
//id="navbarScrollingDropdown"
active>
<NavDropdown.Item as={Link} to="/pricing" >Pricing</NavDropdown.Item>
<NavDropdown.Item as={ Link} to="/services">
Services
</NavDropdown.Item>

<NavDropdown.Item to="#action5" >
Something else here
</NavDropdown.Item>
</NavDropdown>

<Nav.Link as={Link} to="/users" style={{ color: '#ffff' }}>Users</Nav.Link>
<Nav.Link as={Link} to="/products" style={{ color: '#ffff' }}>
Products
</Nav.Link>
</Fragment>
)}
{/* admin routes */}
</Nav>


<NavDropdown title={user.role} style={{ color: '#ffff' }}
id="collasible-nav-dropdown"
//id="navbarScrollingDropdown"
>
<NavDropdown.Item  className='mr-4' as={ Link} to="/profile">Profile</NavDropdown.Item>

<NavDropdown.Item to="#action5">
<span className='btn btn-warning' onClick={onLogout}>
<i className="fa fa-power-off"></i>Logout
</span>
</NavDropdown.Item>
</NavDropdown>
</Fragment>
): (
<Fragment>
<Nav>                  
<Nav.Link as={Link} to="/login" style={{ color: '#ffff' }}>Login</Nav.Link>          
<Nav.Link as={Link} to="/register" style={{ color: '#ffff' }}>Register</Nav.Link>
</Nav>
</Fragment>
)}
</Navbar.Collapse>
</Container>
</Navbar>
)
}
