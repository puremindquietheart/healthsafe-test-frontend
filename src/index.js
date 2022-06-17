import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './index.css';
import App from './App';

import AddToCart from "./routes/AddToCart";
import RemoveItem from "./routes/RemoveItem";
import ManageCart from "./routes/ManageCart";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="add-to-cart" element={<AddToCart />} />
      <Route path="remove-item" element={<RemoveItem />} />
      <Route path="manage-cart" element={<ManageCart />} />
    </Routes>
  </BrowserRouter>
);
