import { 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAIL,
    ORDER_CREATE_FAIL_400, 

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL_400,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL_400,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL_400,
    ORDER_LIST_MY_FAIL,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL_400,
    ORDER_LIST_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL_400,
    ORDER_DELIVER_FAIL,
} from'../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `/api/orders/${id}/`
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        if (response.ok) {
            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: data
            })
        }
        else {
            dispatch({
                type: ORDER_DETAILS_FAIL_400,
                payload: data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `/api/orders/add/`
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        if (response.ok) {


            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data
            })

            dispatch({
                type: CART_CLEAR_ITEMS,
                payload: data
            })
            localStorage.removeItem('cartItems')
        }
        else {
            dispatch({
                type: ORDER_CREATE_FAIL_400,
                payload: data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `/api/orders/${id}/pay/`
        let response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(paymentResult),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        if (response.ok) {
            dispatch({
                type: ORDER_PAY_SUCCESS,
                payload: data
            })
        }
        else {
            dispatch({
                type: ORDER_PAY_FAIL_400,
                payload: data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `/api/orders/${order._id}/deliver/`
        let response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        if (response.ok) {
            dispatch({
                type: ORDER_DELIVER_SUCCESS,
                payload: data
            })
        }
        else {
            dispatch({
                type: ORDER_DELIVER_FAIL_400,
                payload: data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}


export const listMyOrders = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `/api/orders/myorders/`
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        if (response.ok) {
            dispatch({
                type: ORDER_LIST_MY_SUCCESS,
                payload: data
            })
        }
        else {
            dispatch({
                type: ORDER_LIST_MY_FAIL_400,
                payload: data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const listOrders = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })

        const { 
            userLogin: { userInfo }
         } = getState()
        let url = `/api/orders/`
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        let data = await response.json()
        if (response.ok) {
            dispatch({
                type: ORDER_LIST_SUCCESS,
                payload: data
            })
        }
        else {
            dispatch({
                type: ORDER_LIST_FAIL_400,
                payload: data.detail
            })
        }

    }catch(error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}