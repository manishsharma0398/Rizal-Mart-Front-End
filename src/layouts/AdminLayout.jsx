import { useState } from "react";
import { Layout, Menu } from "antd";
const { Header, Sider, Content } = Layout;
import { useSelector } from "react-redux";
import { FaListAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import { IoMdNotifications } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Outlet, useNavigate } from "react-router-dom";
import { BsFillCartPlusFill, BsFillCartFill } from "react-icons/bs";
import {
  AiOutlineDashboard,
  AiOutlineBgColors,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineLogout,
} from "react-icons/ai";

import { selectUserData } from "../features/auth/authSlice";

import "./App.scss";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const currentUser = useSelector(selectUserData);

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <span className="sm-logo">A.P</span>
          <span className="lg-logo">Admin Panel</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "logout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <HiOutlineUserGroup className="fs-4" />,
              label: "Customers",
            },
            {
              key: "coupon",
              icon: <BsFillCartFill className="fs-4" />,
              label: "Coupons",
              children: [
                {
                  key: "coupon-add",
                  icon: <BsFillCartPlusFill className="fs-4" />,
                  label: "Add a coupon",
                },
                {
                  key: "coupon-list",
                  icon: <BsFillCartPlusFill className="fs-4" />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "category",
              icon: <BsFillCartFill className="fs-4" />,
              label: "Category",
              children: [
                {
                  key: "add-category",
                  icon: <BiCategory className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <BiCategory className="fs-4" />,
                  label: "Category List",
                },
              ],
            },
            {
              key: "colors",
              icon: <BsFillCartFill className="fs-4" />,
              label: "Colours",
              children: [
                {
                  key: "add-colour",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Colour",
                },
                {
                  key: "colour-list",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Colour List",
                },
              ],
            },
            {
              key: "product",
              icon: <BsFillCartFill className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "add-product",
                  icon: <BsFillCartPlusFill className="fs-4" />,
                  label: "Add a Product",
                },
                {
                  key: "product-list",
                  icon: <BsFillCartPlusFill className="fs-4" />,
                  label: "Product List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaListAlt className="fs-4" />,
              label: "Orders",
            },
            {
              key: "enquiry",
              icon: <FaListAlt className="fs-4" />,
              label: "Enquiry",
            },
            {
              key: "logout",
              icon: <AiOutlineLogout className="fs-4" />,
              label: "Log Out",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="admin-panel-header">
          <button className="trigger" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <AiOutlineRight /> : <AiOutlineLeft />}
          </button>

          <div className="right">
            <div className="position-relative">
              <IoMdNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <img
              style={{ objectFit: "cover" }}
              height="32px"
              width="32px"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <div className="text-content">
              <span className="name">
                {currentUser.firstname + " " + currentUser.lastname}
              </span>
              <span className="email">{currentUser.email}</span>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <ToastContainer
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
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
