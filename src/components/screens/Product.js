// load react helpers
import { Link } from "react-router-dom";
// load dynamic component
import Header from '../Header'
import DataTable from '../DataTable';
import Home from './Home';
// load antd helpers
import { Space } from 'antd';
// load antd icons
import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

const Product = () => {

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
			title:'Stock',
            dataIndex:'stock'
		},
		{
			title: 'Action',
			dataIndex: 'id',
			key: '4',
			render: (text, record) => (
				<Space>
					<Link to={`/product/view-product/${record.id}`} title='Click to update a product.' className="link-default"> <EyeOutlined /> </Link> 
					<Link to={`/product/update-product/${record.id}`} title='Click to update a product.' className="link-minus"> <EditOutlined /> </Link> 
					<Link to={`/product/delete-product/${record.id}`} title='Click to delete a product.' className="link-remove"> <DeleteOutlined/> </Link> 
				</Space>
			)
		},
	]

    return (
        <div className="App">
            <Home inHome={false} />
            <Link to="/product/add-product" title='Click to create new product.'> Click here to create a new product </Link>
            <Header params={{title:"Products", inShopping:false, inHome:false}} />
            <DataTable columns={columns} inCart={false} />

        </div>
    );
}

export default Product