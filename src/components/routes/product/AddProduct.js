import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// load dynamic component
import Header from "../../Header"
// load antd helpers
import { Button, Form, Input, InputNumber, Upload, Spin } from 'antd';
// load antd icons
import {
    UploadOutlined,
} from '@ant-design/icons';
// load swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};

const validateMessages = {
	required: '${label} is required!',
	types: {
		number: '${label} is not a valid number!',
	}
};

const AddProduct = () => {

	const [loading, setLoading] = useState(false);

	let status = null;
	const navigate = useNavigate();
	const MySwal = withReactContent(Swal)

	const onCreate = (values) => {

		setLoading(true)

		const fd = new FormData();
		
		fd.append('name', values.name)
		fd.append('price', values.price)
		fd.append('stock', values.stock)
		fd.append('image', values.image[0].originFileObj)

		let requestOptions = {
			method: 'POST',
			body: fd
		};

		fetch('/api/products', requestOptions)
			.then((res) => {
				status = res.status
				return res.json();
			})
			.then((res) => {
				
				if (status === 201) {
					
					MySwal.fire({
						title: 'New Product',
						icon: 'success',
						text: 'You successfully created a new product.'
					}).then(() => {
						navigate(-1)
					})
				} else if (status === 422) {
					// Note: Need to format this by next line
					let txtError = ""
					
					if (res.server_response.name) {
						txtError = `${txtError} • ${res.server_response.name} \n`
					}
					if (res.server_response.price) {
						txtError = `${txtError} • ${res.server_response.price} \n`
					}
					if (res.server_response.stock) {
						txtError = `${txtError} • ${res.server_response.stock} \n`
					}
					if (res.server_response.image) {
						txtError = `${txtError} • ${res.server_response.image} \n`
					}
					
					MySwal.fire({
						title: 'Invalid Values',
						icon: 'warning',
						text: `${txtError}`
					})
				}

				setLoading(false)

			}).catch(error => {
				alert(error)
				console.error('There was an error!', error);
				setLoading(false)
			});
	};

	const normFile = (e) => {
		if (Array.isArray(e)) {
		  return e;
		}
		return e?.fileList;
	};

	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess("ok");
		}, 0);
	};

	return (
		<div className='App'>
			<Spin spinning={loading} tip="Creating...">
				<Link to="/product">Go back </Link>
				<Header params={{title:'Create New Product', inShopping:false}} />
				<Form {...layout} name="nest-messages" onFinish={onCreate} validateMessages={validateMessages}>
					<Form.Item
						name={['name']}
						label="Name"
						rules={[
							{
								required: true,
								type:'string'
							},
						]}
						style={{width:'50%'}}
					>
						<Input style={{width:'100%'}} placeholder='Input product name' />
					</Form.Item>
					<Form.Item
						name={['price']}
						label="Price"
						rules={[
							{
								required: true,
								type: 'number',
								'min': 0
							},
						]}
						style={{width:'50%'}}
					>
						<InputNumber style={{width:'100%'}} placeholder='Input product price' />
					</Form.Item>
					<Form.Item
						name={['stock']}
						label="Stock"
						rules={[
							{
								required: true,
								type: 'number',
								'min': 0
							},
						]}
						style={{width:'50%'}}
					>
						<InputNumber style={{width:'100%'}} placeholder='Input product stock' />
					</Form.Item>
					<Form.Item
						name={['image']}
						label="Upload"
						valuePropName="fileList"
						getValueFromEvent={normFile}
						rules={[
							{
								required: true,
							},
						]}
						style={{width:'50%'}}
					>
						<Upload name="logo" customRequest={dummyRequest} listType="picture">
							<Button icon={<UploadOutlined />}>Click to upload</Button>
						</Upload>
					</Form.Item>
					<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} style={{width:'50%'}}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Spin>
		</div>
	);
};

export default AddProduct;