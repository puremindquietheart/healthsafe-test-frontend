// load css
import 'antd/dist/antd.css';
import './App.css';
// load antd icons
import {
  PlusCircleOutlined,
} from '@ant-design/icons';
// load header component
import Header from './components/Header'
// load swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// load react helpers
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
// load antd helpers
import { Table, Input } from 'antd';
const { Search } = Input;

const App = () => {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    sortBy:"created_at",
    sortOrder:"desc",
    search:""
  });

  const MySwal = withReactContent(Swal)

  const onSearch = (value) => {

    pagination.search = value;
    pagination.current = 1;
    
    fetchData({
      pagination:pagination
    });
    
  }

  const addToCart = (rowData) => {

    if (!window.localStorage.getItem("CART_ITEMS")) {

      let cartItems = [];

      let obj = {...rowData, quantity:1}; 
      cartItems.push(obj)

      window.localStorage.setItem("CART_ITEMS", JSON.stringify(cartItems))

    } else {
      let getCartItems = window.localStorage.getItem("CART_ITEMS")
      const itemExists = getCartItems.some(item => item.id === rowData.id);

      console.log(itemExists)
    }
    // console.log(console.log(localStorage));
    // return false;
    // let getCartItems = window.localStorage.getItem("CART_ITEMS")
    // console.log(getCartItems);
    // return false;
    // if (getCartItems.length === 0) {

      // let cartItems = [];

      // let obj = {...rowData, quantity:1}; 
      // cartItems.push(obj)

      // window.localStorage.setItem("CART_ITEMS", JSON.stringify(cartItems))

    // } else {

    //   let getCartItems = JSON.parse(getCartItems)
    //   console.log(getCartItems)
    //   // const itemExists = getCartItems.some(item => item.id === rowData.id);

    //   // console.log(itemExists)

    //   // console.log(JSON.parse(getCartItems));
    // }
  }

  const fetchData = (params = {}) => {

    setLoading(true);

    const {current, pageSize, sortBy, sortOrder, search } = params.pagination;
    
    fetch(`/api/products?page=${current}&limit=${pageSize}&sort_by=${sortBy}&sort_order=${sortOrder}&search=${search}`)
      .then((res) => res.json())
      .then(({data, meta}) => {
        setProducts(data);
        setLoading(false);
        setPagination({
          ...params.pagination,
          total: meta != null ? meta.total : 0
        });
      });
  };

  useEffect(() => {
    fetchData({
      pagination,
    });
  }, []);

  const handleTableChange = (newPagination, filters, sorter) => {
    fetchData({
      sortBy: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    });
  };

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
      title: 'Action',
      dataIndex: 'id',
      key: '3',
      render: (text, record) => (
        <PlusCircleOutlined onClick={()=> addToCart(record)} style={{ cursor: 'pointer' }} title="Add to Cart" />
      )
    },
  ]

  return (
    <div className="App">
      <Header />
      <Search
        placeholder="Search by product name"
        allowClear
        onSearch={onSearch}
        style={{
          width: 350,
        }}
      />
      <Table
        size="small"
        columns={columns}
        rowKey="id"
        dataSource={products}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default App;