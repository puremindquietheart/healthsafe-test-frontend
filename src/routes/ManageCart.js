// load css
import 'antd/dist/antd.css';
import '../App.css';
// load antd icons
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
// load header component
import Header from '../components/Header'
// load react helpers
import { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
// load antd helpers
import { Table, Row, Col, Button, Space} from 'antd';

const ManageCart = () => {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [computeTotal, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  useEffect(() => {
    
    setLoading(true);

    const productItems = JSON.parse(window.localStorage.getItem("CART_ITEMS"))

    setProducts(productItems)

    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items:productItems
      })
    };

    fetch('/api/cart/compute', requestOptions)
      .then((res) => res.json())
      .then(({data, other_data}) => {
        if (other_data) {
          setTotalPrice(other_data.total_price)
          setTotalQty(other_data.total_qty)
        }
      });
    setLoading(false);
  }, []);

  // // I will use my endpoint instead
  // const computeTotal = () => {

  //   let grandTotal = 0;

  //   products.forEach((item) => {
  //     let subTotal = item.quantity * item.price

  //     grandTotal = grandTotal + subTotal
  //   })  
    
  //   return grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2})
  // }

  const columns = [
    {
      key:"1",
      title:'Product Name',
      dataIndex:'name'
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
          <Link to="/add-to-cart" title='Click to add this product to your cart.' state={{rowData:record, from:window.location.href}} className="link-add"> <PlusCircleOutlined/> </Link> 
          <Link to="/remove-item" title='Click to remove quantity.' state={{rowData:record, from:window.location.href, forceRemove:false}} className="link-minus"> <MinusCircleOutlined /> </Link> 
          <Link to="/remove-item" title='Click to remove product.' state={{rowData:record, from:window.location.href, forceRemove:true}} className="link-remove"> <DeleteOutlined/> </Link> 
        </Space>
        
      )
      // (
      //   <PlusCircleOutlined onClick={()=> addToCart(record)} style={{ cursor: 'pointer' }} title="Add to Cart" />
      // )
    },
  ]

  return (
    <div className="App">
      <Button style={{textAlign:'left'}} href="/">Go back</Button>
      <Row>
        <Col span={12}>
          <Header params={{title:"My Cart", isHome:false}} />
          <Table
            size="small"
            columns={columns}
            rowKey="id"
            dataSource={products}
            loading={loading}
          />
        </Col>
        <Col span={12}>
          <Header params={{title:"Cart Computation", isHome:false}} />
          <h1><b>Total Price:</b> {computeTotal}</h1>
          <h1><b>Total Quantity:</b> {totalQty}</h1>
        </Col>
      </Row>
      
    </div>
  );
};

export default ManageCart;