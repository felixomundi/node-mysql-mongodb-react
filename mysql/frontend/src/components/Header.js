import { logout } from 'features/auth/authSlice';
import {Container,Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
  const { user} = useSelector(state => state.auth);
  const dispatch = useDispatch() 
  const authLinks = (
    <>
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
      <Nav.Link ><Button onClick={() =>dispatch(logout())}>Logout</Button></Nav.Link>
    </>
  );

  const guestLinks = (
    <>
       <Nav.Link as={Link} to="/login">Login</Nav.Link>
        <Nav.Link as={Link} to="/register">Register</Nav.Link>
  </>
)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid className="text-light">
        <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {user? authLinks : guestLinks }
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} as={Link} to="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;