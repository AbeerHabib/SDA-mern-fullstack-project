import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCategories } from "./redux/slices/categories/categorySlice";
import { fetchOrders } from "./redux/slices/orders/orderSlice";
import { fetchProducts } from "./redux/slices/products/productSlice";
import { fetchUsers } from "./redux/slices/users/userSlice";
import { AppDispatch } from "./redux/store";

import Index from "./routes/Index";

import "./styles/AdminStyle.css";
import "./styles/App.css";
import "./styles/CartStyle.css";
import "./styles/HomePageStyle.css";
import "./styles/LoginStyle.css";
import "./styles/ProductsStyle.css";
import "./styles/UserStyle.css";
import "./styles/tablesStyle.css";

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
  dispatch(fetchUsers());
  }, []);

  return <Index />
}

export default App;