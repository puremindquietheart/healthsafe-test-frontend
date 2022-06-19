import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
// load dynamic component
import Header from "../../Header"
// load antd helpers
import { Form, Input, InputNumber, Spin, Image} from 'antd';
// load swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

let status = null

const DeleteProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal)

    const deleteProduct = () => {
        fetch(`/api/products/${id}`, {method:'DELETE'})
            .then((res) => res.json())
			.then((res) => {
                MySwal.fire({
                    title: 'Deleted',
                    icon: 'info',
                    text: `Product id: ${id} is already deleted.`
                }).then(() => {
                    navigate(-1)
                })
			}).catch(error => {
				alert(error)
				console.error('There was an error!', error);
			});
    }

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then((res) => {
                status = res.status
                return res.json();
            })
			.then(({data}) => {

                if (status === 200) {

                    deleteProduct()
                    
				} else {
					
					MySwal.fire({
						title: 'Invalid',
						icon: 'warning',
						text: `Product id: ${id} does not exist.`
					}).then(() => {
						navigate(-1)
					})
				}
                
			}).catch(error => {
				alert(error)
				console.error('There was an error!', error);
			});
    }, [])

    return (
        <main></main>
    )
}

export default DeleteProduct