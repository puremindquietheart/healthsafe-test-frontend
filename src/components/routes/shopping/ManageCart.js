// load react helpers
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
// load css
import 'antd/dist/antd.css';
import '../../../App.css';
// load antd icons
import {
	PlusCircleOutlined,
	MinusCircleOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
// load dynamic component
import Header from '../../Header'
import DataTable from '../../DataTable';
// load antd helpers
import { Row, Col, Space} from 'antd';

const ManageCart = () => {

	const [computeTotal, setTotalPrice] = useState(0);
	const [totalQty, setTotalQty] = useState(0);

	useEffect(() => {

		let cartItems = JSON.parse(window.localStorage.getItem("CART_ITEMS"))

		let requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				items:cartItems
			})
		};

		fetch('/api/cart/compute', requestOptions)
			.then((res) => res.json())
			.then(({server_response, other_data, deleted_items}) => {
				cartItems.forEach((item, index) => {
					if (server_response[`items.${index}.id`] || deleted_items.includes(index)) {
						cartItems[index]['is_deleted'] = true
					} else {
						cartItems[index]['is_deleted'] = false
					}
				})
				window.localStorage.setItem("CART_ITEMS", JSON.stringify(cartItems))
				if (other_data) {
					setTotalPrice(other_data.total_price)
					setTotalQty(other_data.total_qty)
				}
			}).catch(error => {
				alert(error)
				console.error('There was an error!', error);
			});

	}, []);

	// // I will use my endpoint instead
	// const computeTotal = () => {

	// 	let grandTotal = 0;

	// 	products.forEach((item) => {
	// 		let subTotal = item.quantity * item.price

	// 		grandTotal = grandTotal + subTotal
	// 	})  

	// 	return grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2})
	// }

	const columns = [
		{
			key:"1",
			title:'Product Name',
			dataIndex:'name',
			render: (text, record) => {
                return (
                    <div>
                        <img alt={record.image} src={record.image} height={50} width={50} /> {record.name}
                    </div>
                );
            }
		},
		{
			key:"2",
			title:'Price',
			dataIndex:'price'
		},
		{
			key:"3",
			title:'Quantity',
			dataIndex:'quantity'
		},
		{
			key:"4",
			title:'Total',
			render: (text, record) => (
				(record.quantity * record.price).toLocaleString(undefined, {minimumFractionDigits: 2})
			)
		},
		{
			title: 'Action',
			dataIndex: 'id',
			key: '5',
			render: (text, record) => (
				<Space>
					<Link to="/shopping/add-to-cart" title='Click to add this product to your cart.' state={{rowData:record, from:window.location.href}} className="link-add"> <PlusCircleOutlined/> </Link> 
					<Link to="/shopping/remove-item" title='Click to remove quantity.' state={{rowData:record, from:window.location.href, forceRemove:false}} className="link-minus"> <MinusCircleOutlined /> </Link> 
					<Link to="/shopping/remove-item" title='Click to remove product.' state={{rowData:record, from:window.location.href, forceRemove:true}} className="link-remove"> <DeleteOutlined/> </Link> 
				</Space>
			)
		},
	]

	return (
		<div className="App">
			<Link to="/shopping">Go back </Link>
			<Row>
				<Col span={12}>
					<Header params={{title:"My Cart", isHome:false, inHome:false}} />
					<span style={{color:'red'}}>Note: Those row with strikeout were deleted products. Kindly remove it to your cart.</span>
					<DataTable columns={columns} inCart={true} />
				</Col>
				<Col span={12}>
					<Header params={{title:"Cart Computation", isHome:false, inHome:false}} />
					<h1><b>Total Price:</b> {computeTotal}</h1>
					<h1><b>Total Quantity:</b> {totalQty}</h1>
				</Col>
			</Row>

		</div>
	);
};

export default ManageCart;