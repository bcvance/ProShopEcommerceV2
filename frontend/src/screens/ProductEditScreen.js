import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, updateProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen() {

    const { id:productId } = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate


    useEffect(() => {

        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        }
        else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } 
            else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [product, productId, navigate, dispatch, successUpdate])

    const submitHandler = (e) => {
        dispatch(updateProduct({
            _id: productId,
            name, 
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const response = await fetch('http://127.0.0.1:8000/api/products/upload/', {
                method: 'POST',
                body: formData
            }) 
            const data = await response.json()
            console.log(data)

            setUploading(false)
            setImage(data)

        } catch(error) {
            setUploading(false)
            console.log(error)
        }
    }

  return (

    <div>
        <Link to='/admin/productlist'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit Product</h1>

            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type='name' 
                                placeholder='Enter name' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                type='number' 
                                placeholder='Set price' 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Set Image' 
                                value={image} 
                                onChange={(e) => setImage(e.target.value)}>
                            </Form.Control>

                            <Form.Control
                                type='file'
                                id='imageFile'
                                label='Choose File'
                                custom
                                onChange={(e) => uploadFileHandler(e)}
                                >
                            </Form.Control>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Set Brand' 
                                value={brand} 
                                onChange={(e) => setBrand(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Set Count In Stock' 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control 
                                type='number' 
                                placeholder='Set Count In Stock' 
                                value={countInStock} 
                                onChange={(e) => setCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Add Description' 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
        </FormContainer>
    </div>
  )
}

export default ProductEditScreen