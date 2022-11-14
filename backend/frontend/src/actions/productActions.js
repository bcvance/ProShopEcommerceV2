
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_FAIL_400,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_FAIL_400,
} from '../constants/productConstants'

export const listProducts = (keyword = '') => async (dispatch) => {
    try{
        dispatch({ type:PRODUCT_LIST_REQUEST })

        let url = `http://127.0.0.1:8000/api/products${keyword}`;
        const response = await fetch(url);
        const  data = await response.json();

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({ type:PRODUCT_DETAILS_REQUEST })

        let url = `http://127.0.0.1:8000/api/products/${id}`;
        const response = await fetch(url);
        const  data = await response.json();

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `http://127.0.0.1:8000/api/products/create/`
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        dispatch({
            payload: data,
            type: PRODUCT_CREATE_SUCCESS,
        })

    }catch(error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `http://127.0.0.1:8000/api/products/delete/${id}/`
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    }catch(error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `http://127.0.0.1:8000/api/products/update/${product._id}/`
        let response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        dispatch({
            payload: data,
            type: PRODUCT_UPDATE_SUCCESS,
        })

        // update product details after update, so that even if user was 
        // previously viewing the updated product before the update,
        // the state information will be updated with the current product info
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: data})

    }catch(error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const createProductReview = (id, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `http://127.0.0.1:8000/api/products/${id}/reviews/`
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(review),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        if (response.ok) {
            dispatch({
                payload: data,
                type: PRODUCT_CREATE_REVIEW_SUCCESS,
            })
        }
        else {
            dispatch({
                payload: data.detail,
                type: PRODUCT_CREATE_REVIEW_FAIL_400,
            })
        }

    }catch(error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try{
        dispatch({ type:PRODUCT_TOP_REQUEST })

        let url = `http://127.0.0.1:8000/api/products/top/`;
        const response = await fetch(url);
        const  data = await response.json();

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

