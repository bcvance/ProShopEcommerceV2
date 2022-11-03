import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState('')

    let navigate = useNavigate()
    let location = useLocation()

    const submitHandler = (e) => {
        e.preventDefault()
        // redirect user to filtered products page if search box contains text
        if (keyword) {
            if (location.pathname == '/admin/productlist/') {
                navigate(`/admin/productlist/?keyword=${keyword}&page=1`)
            }
            else {
                navigate(`/?keyword=${keyword}&page=1`)
            }
        }     
    }
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
            type='text'
            name='q'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Button
            type='submit'
            variant='outline-success'
            className='p-2 ms-1'
        >Submit</Button>
    </Form>
  )
}

export default SearchBox