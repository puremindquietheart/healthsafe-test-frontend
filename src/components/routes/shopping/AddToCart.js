import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
  // load swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddToCart = () => {

    let navigate = useNavigate();

    let isNew = false;
    const MySwal = withReactContent(Swal)

    const data = useLocation()
    const { rowData, from } = data.state

    const addProductToCart = (currentCartItems, rowData) => {

        if (currentCartItems === null) {
            currentCartItems = [];
        }

        let obj = {...rowData, quantity:1}; 
        currentCartItems.push(obj)

        window.localStorage.setItem("CART_ITEMS", JSON.stringify(currentCartItems))

    }

    const updateCurrentProduct = (currentCartItems, rowData, index) => {

        rowData.quantity = rowData.quantity + 1;
        currentCartItems[index] = rowData;

        window.localStorage.setItem("CART_ITEMS", JSON.stringify(currentCartItems))

    }

    useEffect(() => {

        let currentCartItems = JSON.parse(window.localStorage.getItem("CART_ITEMS"));

        if (currentCartItems === null) {

            addProductToCart(currentCartItems, rowData)
            isNew = true;
        } else {

            const itemExists = currentCartItems.find(item => item.id === rowData.id);
              
            if (itemExists) {

                const getIndex = currentCartItems.findIndex(item => item.id === rowData.id)

                updateCurrentProduct(currentCartItems, itemExists, getIndex)

            } else {

                addProductToCart(currentCartItems, rowData)

            }

        }

        MySwal.fire({
            title: <p>{isNew ? 'Added' : 'Updated'}</p>,
            icon: 'success',
            text:isNew ? 'New product is added to your cart' : `Product: ${rowData.name} quantity is updated.`
        }).then(() => {
            navigate(-1)
        })
    })

    return (
        <main>
        </main>
    )
}

export default AddToCart