import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
// load dynamic component
import Header from "../../Header"
// load antd helpers
import { Form, Input, InputNumber, Spin, Image, Upload, Button } from 'antd';
// load antd icons
import {
    UploadOutlined,
} from '@ant-design/icons';
// load swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

let status = null;

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

const UpdateProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal)

    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then((res) => {
                status = res.status
                return res.json();
            })
			.then(({data}) => {

                if (status === 200) {

                    setProduct(data)
                    
				} else {
					
					MySwal.fire({
						title: 'Invalid',
						icon: 'warning',
						text: `Product id: ${id} does not exist.`
					}).then(() => {
						navigate(-1)
					})
				}

				setLoading(false)
                
			}).catch(error => {
				alert(error)
				console.error('There was an error!', error);
				setLoading(false)
			});
    }, [])

    const onUpdate = (values) => {

		setLoading(true)

		const fd = new FormData();

        fd.append('is_new', false)
        
        if (values.new_image !== undefined) {

            fd.append('image', values.new_image[0].originFileObj)
            fd.append('is_new', true)
        }

		fd.append('name', values.name)
		fd.append('price', values.price)
		fd.append('stock', values.stock)
        fd.append('_method', 'PUT')

		let requestOptions = {
			method: 'POST',
			body: fd
		};

		fetch(`/api/products/${id}`, requestOptions)
			.then((res) => {
				status = res.status
				return res.json();
			})
			.then((res) => {
				
				if (status === 200) {
					
					MySwal.fire({
						title: 'Updated',
						icon: 'success',
						text: 'You successfully updated a product.'
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
            {product && (
                <Spin spinning={loading} tip="Updating...">
                    <Link to="/product">Go back </Link>
                    <Header params={{title:'Update Product', inShopping:false}} />
                    <Form {...layout} name="nest-messages" onFinish={onUpdate} validateMessages={validateMessages} initialValues={product}>
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
                            <Input style={{width:'100%'}} placeholder='Input product name'/>
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
                            label="Current Image"
                            style={{width:'50%'}}
                        >
                            <Image
                                width={200}
                                src={`${product.image}`}
                            />
                        </Form.Item>
                        <Form.Item
                            name={['new_image']}
                            label="Upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
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
            )}
			
		</div>
	);
}

export default UpdateProduct