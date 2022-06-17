// load css
import 'antd/dist/antd.css';
import './App.css';
// load antd icons
import {
  PlusCircleOutlined,
} from '@ant-design/icons';
// load header component
import Header from './components/Header'
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

  const onSearch = (value) => {

    pagination.search = value;
    pagination.current = 1;
    
    fetchData({
      pagination:pagination
    });
    
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
      render: (text, record) => <Link to="/add-to-cart" title='Click to add this product to your cart.' state={{rowData:record, from:window.location.href}} className="link-add"> <PlusCircleOutlined/> </Link> 
    },
  ]

  return (
    <div className="App">
      <Header params={{title:"Shopping Cart", isHome:true}} />
      <Search
        placeholder="Search by product name"
        allowClear
        onSearch={onSearch}
        style={{
          width: 350,
          textAlign:'center'
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