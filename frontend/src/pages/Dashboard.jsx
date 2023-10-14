import {useEffect} from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import {  homeProducts } from '../features/products/productSlice'
import {toast} from 'react-toastify'
import {Card, Col, Container, Row,Button } from 'react-bootstrap'
import { addToCart } from '../features/cart/cartSlice'
function Dashboard() {
const navigate = useNavigate()
const dispatch = useDispatch()
const { user } = useSelector((state) => state.auth)
const { products, isLoading, isError, message } = useSelector(
  (state) => state.products
)

useEffect(() => {
  
if (!user) {
navigate('/login')
}

if (isError) {
  toast.error(message)
}

dispatch(homeProducts())

}, [user, navigate,isError, message,dispatch])

const handleAddToCart = (product) => {
  dispatch(addToCart(product))
}  
  
if (isLoading) {
  return <Spinner />
}

return (
<Container fluid style={{ minHeight: '90vh' }} 
>
<Card className='mb-4 mt-2'>
<Card.Header className='py-1'>
Welcome <p className='text-success'>{user && user.name}</p>
</Card.Header>
<Card.Body className='g-1'>
<Row>          
          
{products.map(product=>
<Col lg={4} className="text-center mb-2" key={product._id}>
<div className="p-4 border-dark">
<div className="product-entry border">
<Link to="#" className="prod-img">
<img src={product.image} className="img-fluid" alt="Free html5 bootstrap 4 template"/>
</Link>
<div className="desc">
          <h2>{product.name}</h2>
          <Button className='btn btn-primary mr-2 mb-3' onClick={() => handleAddToCart(product)}>Add to Cart</Button>
        
<Link to={`/detail/${product._id}`}><Button>Read More<i className="fa-sharp fa-solid fa-circle-info ml-2"></i></Button> </Link>
</div>
</div>
</div>
</Col>)            
}


</Row>
<Row className='justify-content-center align-items-center'>
<nav aria-label="Page navigation example">
<ul className="pagination justify-content-center">
<li className="page-item disabled">
<Link className="page-link" to="#" >Previous</Link>
</li>
<li className="page-item"><Link className="page-link" to="#">1</Link></li>
<li className="page-item"><Link className="page-link" to="#">2</Link></li>
<li className="page-item"><Link className="page-link" to="#">3</Link></li>
<li className="page-item">
<Link className="page-link" to="#">Next</Link>
</li>
</ul>
</nav>
</Row>
</Card.Body>    

</Card>

</Container>
)
}

export default Dashboard
