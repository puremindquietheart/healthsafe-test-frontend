import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
  // load swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const RemoveItem = () => {

    let isDeleted = false;
    const MySwal = withReactContent(Swal)

    const data = useLocation()
    const { rowData, from, forceRemove } = data.state

    const removeQuantity = (currentCartItems, rowData, index) => {

        if (rowData.quantity > 1 && !forceRemove) {

            rowData.quantity = rowData.quantity - 1;
            currentCartItems[index] = rowData;

        } else {

            currentCartItems.splice(index, 1);
            isDeleted = true;

        }

        window.localStorage.setItem("CART_ITEMS", JSON.stringify(currentCartItems))

    }

    useEffect(() => {

        let currentCartItems = JSON.parse(window.localStorage.getItem("CART_ITEMS"));

        const itemExists = currentCartItems.find(item => item.id === rowData.id);

        const getIndex = currentCartItems.findIndex(item => item.id === rowData.id)

        removeQuantity(currentCartItems, itemExists, getIndex)

        MySwal.fire({
            title: <p>{isDeleted ? 'Deleted' : 'Remove Product Quantity'}</p>,
            icon: 'success',
            text: isDeleted ? `Product: ${rowData.name} is deleted in your cart.` : `Product: ${rowData.name} quantity is updated.`
        }).then(() => {
            window.location = from
        })
    })

    return (
        <main>
        </main>
    )
}

export default RemoveItem