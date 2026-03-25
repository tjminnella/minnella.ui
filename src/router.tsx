
//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'



import { Routes, Route } from "react-router-dom";
//import App from './App';
import { ShoppingList } from "./pages/Utility/shoppingApp";
//import { OTPGenerator } from "./pages/Utility/otpGenerator";
//import { EventRSVPForm } from "./pages/Utility/eventRsvForm";
//import { SuperheroForm } from "./pages/Utility/superHero";
import Resume from "./pages/Contact/Resume";
import HomePage from "./pages/HomePage";
//import Products from "./pages/Products/Products";
//import Products from "./pages/Marketplace/ProductsPage";
//import TailwindDemo from "./pages/Utility/TailwindDemo";
//import Tailwind3Demo from "./pages/Utility/Tailwind3Demo";
import { CartPage, CheckoutPage, OrderConfirmationPage, ProductDetailPage, ProductsPage } from "./pages/Marketplace";
//import { Resume } from "./pages/Contact/resume";
export const Router = () => {
    return (
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="about" element={<ShoppingList />} />
        <Route path="resume" element={<Resume />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
    </Routes>
    )}