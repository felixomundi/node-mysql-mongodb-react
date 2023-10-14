import React from 'react'
import {Link} from 'react-router-dom'
import {Accordion,Card, Col, Container, Row} from 'react-bootstrap';
const productDetail = () => {
return (

<Container fluid className="py-3">
<Row className="justify-content-start g-5">
<Col md={5} >
<Card className="p-4 border-success">
<div className="bg-light text-dark d-flex flex-column justify-content-center">
<Accordion defaultActiveKey="0">
<Card className="mb-3">
<Accordion.Item eventKey="0">
<Accordion.Header>Accordion Item #1</Accordion.Header>
<Accordion.Body>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.
</Accordion.Body>
</Accordion.Item>

</Card>
<Card className='mb-3'>
<Accordion.Item eventKey="1">
<Accordion.Header>Accordion Item #2</Accordion.Header>
<Accordion.Body>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.
</Accordion.Body>
</Accordion.Item>
</Card>
</Accordion>
</div>
</Card>
</Col>

<Col lg={7} className="h-auto mb-30">
<Card className='p-4 border-primary'>
<div className="h-100 bg-light p-30">
<h3>Product Name Goes Here</h3>

<h3 className="font-weight-semi-bold mb-4">$150.00</h3>
<p className="mb-4">Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit
clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea
Nonumy</p>
<div className="d-flex mb-3">
<strong className="text-dark mr-3">Sizes:</strong>

</div>
<div className="d-flex mb-4">
<strong className="text-dark mr-3">Colors:</strong>

</div>
<div className="d-flex align-items-center mb-4 pt-2">
<div className="input-group quantity mr-3" style={{ width: '130px' }}>
<div className="input-group-btn">
<button className="btn btn-primary btn-minus">
<i className="fa fa-minus"></i>
</button>
</div>
<p  className="form-control bg-white border-0 text-center">2</p>
<div className="input-group-btn">
<button className="btn btn-primary btn-plus">
<i className="fa fa-plus"></i>
</button>
</div>
</div>
<button className="btn btn-primary px-3"><i className="fa fa-shopping-cart mr-1"></i> Add To
Cart</button>
</div>
<div className="d-flex pt-2">
<strong className="text-dark mr-2">Share on:</strong>
<div className="d-inline-flex">
<Link className="text-dark px-2" to="">
<i className="fab fa-facebook-f"></i>
</Link>
<Link className="text-dark px-2" to="">
<i className="fab fa-twitter"></i>
</Link>
<Link className="text-dark px-2" to="">
<i className="fab fa-linkedin-in"></i>
</Link>
<Link className="text-dark px-2" to="">
<i className="fab fa-pinterest"></i>
</Link>
</div>
</div>
</div>
</Card>
</Col>
</Row>

{/* End of second column */}
</Container>


)
}

export default productDetail