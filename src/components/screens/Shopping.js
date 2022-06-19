// load css
import '../../App.css';
// load dynamic component
import Header from '../Header'
import DataTable from '../DataTable';
import Home from './Home'

import { Link } from "react-router-dom";
// load antd icons
import {
    PlusCircleOutlined,
} from '@ant-design/icons';

const Shopping = () => {

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
            title: 'Action',
            dataIndex: 'id',
            key: '3',
            render: (text, record) => <Link to="/shopping/add-to-cart" title='Click to add this product to your cart.' state={{rowData:record, from:window.location.href}} className="link-add"> <PlusCircleOutlined/> </Link> 
        },
    ];

	return (
		<div className="App">
			<Home inHome={false} />
			<Header params={{title:"Shopping Cart", inShopping:true, inHome:false}} />
			<DataTable columns={columns} inCart={false} />
		</div>
	);
};

export default Shopping;