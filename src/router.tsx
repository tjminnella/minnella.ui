
//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'



import { Routes, Route } from "react-router-dom";
//import App from './App';
import { ShoppingList } from "./pages/Utility/shoppingApp";
//import { OTPGenerator } from "./pages/Utility/otpGenerator";
import { EventRSVPForm } from "./pages/Utility/eventRsvForm";
import { SuperheroForm } from "./pages/Utility/superHero";
import Resume from "./pages/Contact/Resume";
import HomePage from "./pages/HomePage";
//import Products from "./pages/Products/Products";
import Products from "./pages/Marketplace/ProductsPage";
import TailwindDemo from "./pages/Utility/TailwindDemo";
import Tailwind3Demo from "./pages/Utility/Tailwind3Demo";
//import { Resume } from "./pages/Contact/resume";
export const Router = () => {
    return (
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="about" element={<ShoppingList />} />
        <Route path="resume" element={<Resume />} />
        <Route path="tailwind" element={<TailwindDemo />} />
        <Route path="tailwind3" element={<Tailwind3Demo />} />
        <Route path="products">
          <Route index element={<Products />} />
        <Route path=":category" element={<EventRSVPForm />} />
          <Route path=":category/:productId" element={<SuperheroForm />} />
        {/*<Route path="trending" element={<Trending />} />*/}
      </Route>
    </Routes>
    )}