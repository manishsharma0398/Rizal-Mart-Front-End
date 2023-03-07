import { ToastContainer } from "react-toastify";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { OnlyNotAuth, OnlyAuthUser } from "./components/RouteProtection";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Unauthorized from "./components/Unauthorized";

import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import SingleProduct from "./pages/single-product/SingleProduct";

import Orders from "./pages-admin/Orders";
import Enquiries from "./pages-admin/Enquiries";
import Dashboard from "./pages-admin/Dashboard";
import Customers from "./pages-admin/Customer";
import AddCoupon from "./pages-admin/coupons/AddCoupon";
import CouponList from "./pages-admin/coupons/CouponsList";
import AddProduct from "./pages-admin/product/AddProduct";
import ProductList from "./pages-admin/product/ProductList";
import AddCategory from "./pages-admin/category/AddCategory";
import CategoryList from "./pages-admin/category/CategoryList";

import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

// import "react-widgets/styles.css";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="">
          <Route element={<OnlyAuthUser allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="enquiry" element={<Enquiries />} />
              <Route path="customers" element={<Customers />} />
              <Route path="coupon-list" element={<CouponList />} />
              <Route path="coupon-add" element={<AddCoupon />} />
              <Route path="coupon-update/:couponId" element={<AddCoupon />} />
              <Route path="product-add" element={<AddProduct />} />
              <Route
                path="product-update/:productId"
                element={<AddProduct />}
              />
              <Route path="product-list" element={<ProductList />} />
              <Route path="category-list" element={<CategoryList />} />
              <Route path="category-add" element={<AddCategory />} />
              <Route
                path="category-update/:categoryId"
                element={<AddCategory />}
              />
            </Route>
          </Route>

          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />

            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<SingleProduct />} />

            <Route element={<OnlyAuthUser allowedRoles={["user"]} />}></Route>

            <Route element={<OnlyNotAuth />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
          </Route>

          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
    </>
  );
};
export default App;
