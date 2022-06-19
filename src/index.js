import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './index.css';

import Home from './components/screens/Home';
import Product from './components/screens/Product';
import AddProduct from './components/routes/product/AddProduct';
import ViewProduct from './components/routes/product/ViewProduct';
import UpdateProduct from './components/routes/product/UpdateProduct';
import DeleteProduct from './components/routes/product/DeleteProduct';

import Shopping from './components/screens/Shopping';
import AddToCart from "./components/routes/shopping/AddToCart";
import RemoveItem from "./components/routes/shopping/RemoveItem";
import ManageCart from "./components/routes/shopping/ManageCart";

import NotFound from './components/screens/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home/>}/>
			{/* Note to be improve: Child routing not re-rendering when accessed. So, I have to settle with this approach */}
			<Route path='product' element={<Product/>}/>
			<Route path='/product/add-product' element={<AddProduct />} />
			<Route path='/product/view-product/:id' element={<ViewProduct />} />
			<Route path='/product/update-product/:id' element={<UpdateProduct />} />
			<Route path='/product/delete-product/:id' element={<DeleteProduct />} />

			<Route path='shopping' element={<Shopping/>} />
			<Route path='/shopping/add-to-cart' element={<AddToCart />} />
			<Route path='/shopping/remove-item' element={<RemoveItem />} />
			<Route path='/shopping/manage-cart' element={<ManageCart />} />

			<Route path='*' element={<NotFound />} />
		</Routes>
	</BrowserRouter>
);
