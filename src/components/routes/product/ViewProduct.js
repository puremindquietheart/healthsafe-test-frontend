import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
// load dynamic component
import Header from "../../Header"
// load antd helpers
import { Form, Input, InputNumber, Spin, Image} from 'antd';
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

const ViewProduct = () => {

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

    return (
		<div className='App'>
            {product && (
                <Spin spinning={loading} tip="Fetching...">
                    <Link to="/product">Go back </Link>
                    <Header params={{title:'View Product', inShopping:false}} />
                    <Link to={`/product/update-product/${id}`} title='Click to update this product.'> Update </Link>
                    <Form {...layout}>
                        <Form.Item
                            label="Name"
                            style={{width:'50%'}}
                        >
                            <Input style={{width:'100%'}} value={`${product.name}`} disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            style={{width:'50%'}}
                        >
                            <InputNumber style={{width:'100%'}} value={`${product.price}`} disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="Stock"
                            style={{width:'50%'}}
                        >   
                            <InputNumber style={{width:'100%'}} value={`${product.stock}`} disabled={true} />
                        </Form.Item>
                        <Form.Item 
                            label="Image"
                            style={{width:'50%'}}
                        >
                            <Image
                                width={200}
                                src={`${product.image}`}
                            />
                        </Form.Item>
                    </Form>
                </Spin>
            )}
			
		</div>
	);
}

export default ViewProduct