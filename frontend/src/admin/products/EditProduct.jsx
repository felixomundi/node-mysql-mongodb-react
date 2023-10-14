import React, { useState, useEffect } from "react";
import {
MDBCard,
MDBCardBody,
MDBValidation,
MDBInput,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  updateProduct } from "../../features/products/productSlice";
import Spinner from '../../components/Spinner'


const UpdateProduct = () => {
    const initialState = {
        name: "",
        description: "",
        price:"",
        };
const [productData, setProductData] = useState(initialState);

const { isError, products,isLoading } = useSelector((state) => ({
...state.products,
}));
const { user } = useSelector((state) => ({ ...state.auth }));
const dispatch = useDispatch();
const navigate = useNavigate();

const { name, description, price } = productData;
const { id } = useParams();

useEffect(() => {
if (id) {
const singleProduct = products.find((product) => product._id === id);
//console.log(singleProduct);
setProductData({ ...singleProduct });
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);

useEffect(() => {
if (!user) {
navigate('/login')
} else if (user && user.role !== "admin") {
navigate('/')
}
isError && toast.error(isError);
}, [user,navigate,isError]);

const handleSubmit = (e) => {
e.preventDefault();
if (name && description && price) {
const updatedProductData = { ...productData };
if (id){       
dispatch(updateProduct({ id, updatedProductData }));
}
    handleClear();
    navigate('/products')
}
    };
    
const onInputChange = (e) => {
const { name, value } = e.target;
setProductData({ ...productData, [name]: value });
// console.log(productData)
};

const handleClear = () => {
setProductData({ name: "", description: "", price: "" });
};

    if (isLoading) {
    return<Spinner/>
}    
    
return (
<div
style={{
marginTop: "20px",
padding: "15px",
maxWidth: "800px",
alignContent: "center",
marginBottom: "20px",
}}
className="container"
>
<MDBCard alignment="center">
<h5>Update Product</h5>
<MDBCardBody>
<MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
<div className="col-md-12">
<MDBInput
placeholder="Enter Name"
type="text"
value={name}
name="name"
onChange={onInputChange}
className="form-control"
required
invalid
validation="Please provide Name"
/>
</div>
<div className="col-md-12">
<MDBInput
placeholder="Enter Description"
type="text"
value={description}
name="description"
onChange={onInputChange}
className="form-control"
required
invalid
textarea
rows={4}
validation="Please provide description"
/>
</div>
<div className="col-md-12">
<MDBInput
placeholder="Enter Price"
type="number"
value={price}
name="price"
onChange={onInputChange}
className="form-control"
required
invalid               
validation="Please provide price Input"
/>
</div>

<div className="col-12">
{/* <MDBBtn style={{ width: "100%" }}>
Update
</MDBBtn> */}
                        <button className="btn btn-primary" type="submit">Update</button>
{/* <MDBBtn
style={{ width: "100%" }}
className="mt-2"
color="danger"
onClick={handleClear}
>
Clear
</MDBBtn> */}
</div>
</MDBValidation>
</MDBCardBody>
</MDBCard>
</div>
);
};

export default UpdateProduct;
