import axios from 'axios'

const API_URL = '/api/products/'

// Create new product
const createProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, productData, config)

  return response.data
}

const homeProducts = async() => {
  const response = await axios.get(API_URL + 'home', )
  return response.data
}


// Get admin products
const getProducts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

// Delete admin product
const deleteProduct = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + productId, config)

  return response.data
}

//Get Single Product by admin
// Get a Product
const getProduct = async (id, token ) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + id, config);
  return response.data;
};

// Update Product by admin
const updateProduct = async (updatedProductData,id,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + id, updatedProductData,config);
  return response.data;
  
};

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  homeProducts
}

export default productService;
