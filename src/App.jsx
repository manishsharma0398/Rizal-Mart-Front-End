import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import UserLayout from "./components/layout/UserLayout";
import AdminLayout from "./components/layout/AdminLayout";

import Home from "./user-pages/home/Home";

import Dashboard from "./admin-pages/Dashboard";
import Login from "./admin-pages/Login";
import ResetPassword from "./admin-pages/ResetPassword";
import ForgotPassword from "./admin-pages/ForgotPassword";
import Enquiries from "./admin-pages/Enquiries";
import Blogs from "./admin-pages/Blogs";
import Orders from "./admin-pages/Orders";
import Customers from "./admin-pages/Customer";
import AddProduct from "./admin-pages/product/AddProduct";
import ProductList from "./admin-pages/product/ProductList";
import CategoryList from "./admin-pages/category/CategoryList";
import AddCategory from "./admin-pages/category/AddCategory";
import ColourList from "./admin-pages/colour/ColourList";
import AddColour from "./admin-pages/colour/AddColour";

import "antd/dist/antd.css";
import "./App.css";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="enquiry" element={<Enquiries />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />

          <Route path="add-product" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />

          <Route path="category-list" element={<CategoryList />} />
          <Route path="add-category" element={<AddCategory />} />

          <Route path="colour-list" element={<ColourList />} />
          <Route path="add-colour" element={<AddColour />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
