import React from 'react'
import { Link } from "react-router-dom";
import {
    ShoppingCartOutlined,
  } from '@ant-design/icons';
import { Space } from 'antd';

const Header = ({ params }) => {

  const {title, isHome} = params

  return (
    <div>
        <h1>{title}</h1>
        {isHome && (
          <Space>
            <Link to="/manage-cart"> <ShoppingCartOutlined/> View Cart </Link>
          </Space>
        )}
        
    </div>
  )
}

export default Header