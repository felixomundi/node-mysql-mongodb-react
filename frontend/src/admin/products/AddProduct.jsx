import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import {
    //Link,
    useNavigate
} from 'react-router-dom'
import { toast } from 'react-toastify' 
import { reset,createProduct } from '../../features/products/productSlice'
import Spinner from '../../components/Spinner'
function EditProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setPic] = useState('');
  const [description, setDescription] = useState("");  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {user} = useSelector((state)=>state.auth)
  const { products, isLoading, isError,
    message } = useSelector(
  (state) => state.products
  )
    
//   const postDetails = (pics) => {
//   if (pics.type === "image/jpeg" || pics.type === "image/png" ) {
//   const data = new FormData();
//   data.append("file", pics);
//   data.append("upload_preset", "blogapp");
//   data.append("cloud_name", "dsjkwvmyp");
//   fetch("https://api.cloudinary.com/v1_1/dsjkwvmyp/image/upload", {
//   method: "post",
//   body: data,
//   })
//   .then((res) => res.json())
//   .then((data) => {
//   setPic(data.url.toString());
//   })
//   .catch((err) => {
//   // console.log(err);
//     toast.error(err)
//   });
//   }  
//   };
  
  useEffect(() => {
  if (isError) {
  toast.error(message)
  }
    if (!user) {
    navigate('/login')
    }
    
  dispatch(reset())
  }, [user, products, isError, //isSuccess,
    message, navigate, dispatch])
  
  
  
  const onSubmit = (e) => {
  e.preventDefault()
  
  const productData = {
  name,
  price,
  image,
  description,
  }
  
  dispatch(createProduct(productData))
  //navigate('/products')
  }
  
  if (isLoading) {
  return <Spinner />
  }
  
  return (
   
    <Container>
<Row className="justify-content-center d-flex">
        <Col md={6} xl={6} sm={12} className="align-items-start">
          <div className="card-header">
            Add Product
          </div>
         
        <Form className='my-2' onSubmit={onSubmit}>
<div className="form-floating mb-3">
<input type="text" className="form-control" id="name" name="name"

              value={name}
              onChange={(e) => setName(e.target.value)}
placeholder="Enter Product Name" />
<label htmlFor="name">Name</label>
</div>
<div className="form-floating mb-3">
              <input type="number" className="form-control" min="0" name="price" id="price" placeholder="Enter Price"
                 value={price}
            onChange={(e) =>setPrice(e.target.value)}
  />
  <label htmlFor="price">Price</label>
  </div>
            
<div className="form-floating mb-3">
              <textarea type="text" className="form-control"
              value={description}
            onChange={(e) =>setDescription(e.target.value)}
                name="description" id="description"
                  
                placeholder="Enter Description"></textarea>
  <label htmlFor="description">Description</label>
</div>
  <div className="form-floating">
  {/* <input type="file" className="form-control"  name="image" id="image"   
                             onChange={(e) => postDetails(e.target.files[0])}/> */}
                          <input type="text" name="image" id="image"
                              value={image}
                              className="form-control"
onChange={(e) =>setPic(e.target.value)}
                          />
  
</div>
                      <div className='my-2 justify-content-around'>
                      
<Button type="submit" className="btn btn-primary btn-sm mb-4">Add Product</Button> 
</div>
</Form>
</Col>        
</Row>
    </Container>  
  )
}

export default EditProduct
