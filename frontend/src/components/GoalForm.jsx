import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify' 
import { reset } from '../features/goals/goalSlice'
import Spinner from './Spinner'
function GoalForm() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setPic] = useState('');
  const [description, setDescription] = useState("");  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {user} = useSelector((state)=>state.auth)
  const { goals, isLoading, isError,// isSuccess,
    message } = useSelector(
  (state) => state.goals
  )
  
  const onChangeFile = (e) => {
    setPic(e.target.files[0])
  }

const goalData = new FormData()
  goalData.append("name", name)
  goalData.append("price", price)
  goalData.append("description", description)
  goalData.append("image",image)
  
  
  useEffect(() => {
  if (isError) {
  toast.error(message)
  }
    if (!user) {
    navigate('/login')
    }
    
  // if (isSuccess) {
  // navigate('/')
  // }
  
  dispatch(reset())
  }, [user, goals, isError, //isSuccess,
    message, navigate, dispatch])
  
  
  
  const onSubmit = (e) => {
  e.preventDefault()
  
  // const goalData = {
  // name,
  // price,
  // image,
  // description,
  // }
  
   
  dispatch(createGoal(goalData))
  
  }
  
  if (isLoading) {
  return <Spinner />
  }
  
  return (
   
    <Container>
<Row className="justify-content-center d-flex">
        <Col md={6} xl={6} sm={12} className="align-items-start">
          <div className="card-header">
            Add Goal
          </div>
         
        <Form className='my-2' onSubmit={onSubmit} encType="multipart/form-data">
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
              <input type="file" className="form-control" filename="image" id="image"  
          
onChange={onChangeFile} />
  
</div>
<div className='my-2'>
<Link  to="/" className="float-start mx-5"><i className='fa fa-reply'>Back</i>  </Link>
<Button type="submit" className="btn btn-primary btn-block mb-4">Add Product</Button> 
</div>
</Form>
</Col>        
</Row>
    </Container>  
  )
}

export default GoalForm
