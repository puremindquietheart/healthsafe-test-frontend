import React from 'react'
import { Link } from "react-router-dom";
import {
    ShoppingCartOutlined,
  } from '@ant-design/icons';
import { Space } from 'antd';

const Header = () => {
  return (
    <div>
        <h1>Shopping Cart</h1>
        <Space>
            <Link to="/manage-cart"> <ShoppingCartOutlined/> </Link>
        </Space>
        <br/>
        <span>View Cart</span>

    </div>
  )
}

export default Header