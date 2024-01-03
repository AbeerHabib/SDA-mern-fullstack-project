import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

import ActivateAccount from "../pages/ActivateAccount";
import Error from "../pages/Error";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import Signup from "../pages/Signup";

import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/products/ProductDetails";

import Categories from "../components/admin/Categories";
import Products from "../components/admin/Products";
import Users from "../components/admin/Users";
import UsersOrders from "../components/admin/UsersOrders";
import AdminDashboard from "../pages/admin/AdminDashboard";

import UserProfile from "../pages/user/UserProfile";

import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

const index = () => {
  return (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />            
      <Route path="/login" element={<Login pathName="/"/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/activate-account/:token" element={<ActivateAccount />} />
      <Route path="/forgot-password/" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/product/:id" element={<ProductDetails />} />
            
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} /> 
        <Route path="admin/Categories" element={<Categories />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/orders" element={<UsersOrders />} />
        <Route path="admin/users" element={<Users />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route path="profile" element={<UserProfile />} />
      </Route>
              
      <Route path="*" element={<Error />} />
    </Routes>
    <Footer />
  </BrowserRouter>
  )
}

export default index;