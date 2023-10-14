import {useEffect,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

import Spinner from '../../components/Spinner'
import {deleteProduct, getProducts } from '../../features/products/productSlice'
import {Card, Container, Table,Button,Form,Modal } from 'react-bootstrap'
import { reset } from '../../features/products/productSlice'
function Dashboard() {
const navigate = useNavigate()
const dispatch = useDispatch()
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


const { user } = useSelector((state) => state.auth)
const { products, isLoading, isError, message } = useSelector(
(state) => state.products
)
useEffect(() => {

if (!user) {
navigate('/login')
}
if (user && user.role !== "admin") {
navigate("/")
}
dispatch(getProducts())
dispatch(reset())
}, [user, navigate, isError, message,
dispatch
])

if (isLoading) {
return <Spinner/>
}


return (
<Container 
fluid style={{ minHeight: '90vh' }}
>
{isLoading && (<Spinner/>)}
<Card className='shadow mb-4 mt-2'>
<Card.Header className='py-3'>
<Link to="/addproduct">Add New Product</Link>
</Card.Header>
<Card.Body>
<div className='table-responsive'>
{!isLoading && products.length === 0 ? (
<p>-- No product found, please add a product...</p>
) : (<>
<Table 
hover
responsive>
<thead>
<tr>
<th>#</th>
<th>Name</th>
<th>Price</th>
<th>Image</th>
<th>Date Created</th>
<td>Action</td> 
</tr>
</thead>
<tfoot>
<tr>
<th>#</th>
<th>Name</th>
<th>Price</th>
<th>Image</th>
<th>Date Created</th>
<td>Action</td> 
</tr>
</tfoot>
<tbody> 
{products.map((product, index) => {
    const { _id, name,  price, createdAt, image } = product;
return (
<tr key={_id}>
<td>{index + 1}</td>
<td>{name.substring(0,10)}...</td>
<td>{price}</td>                  
<td>{<img src={image} alt={name} style={{ width: '50px', height: '50px' }} />}</td> 
<td>{new Date(createdAt).toLocaleString('en-US')}</td>
<td className='d-flex'>
<Button className='mr-2' variant="primary" onClick={ handleShow}><i className='fa fa-eye'></i></Button>
<Modal show={show}  onHide={handleClose} key={_id}>
<Modal.Header closeButton>
<Modal.Title>Edit Product</Modal.Title>
</Modal.Header>
<Modal.Body>
<Form>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
<Form.Label>Name</Form.Label>
<Form.Control
type="text"
autoFocus
defaultValue={name}
     disabled                           
/>
</Form.Group>
<Form.Group
className="mb-3"
controlId="exampleForm.ControlTextarea1"
>
<Form.Label>Example textarea</Form.Label>
<Form.Control as="textarea" rows={3} />
</Form.Group>
</Form>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
Close
</Button>
<Button variant="primary" type="submit">
Save Changes
</Button>
</Modal.Footer>
</Modal>
<Link to={`/products/${_id}`}>  <Button className='btn btn-primary'><i className='fa fa-edit'></i>Edit</Button> </Link>
<Button onClick={() => dispatch(deleteProduct(_id))} className='btn btn-danger ms-3'><i className='fa fa-trash'></i>Delete</Button>
</td>   
</tr>
);})}       
</tbody>
</Table>

</>
)}

</div>
</Card.Body>    

</Card>

</Container>
)
}

export default Dashboard
