import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Product from '../pages/Product/Product';

const RoutesTree = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addProduct" element={<Product />} />
      <Route path="/editProduct/:productId" element={<Product />} />
    </Routes>
  );
}

export { RoutesTree };