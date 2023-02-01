import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TableComponent from "../components/common-components/TableComponent";
import {
  getAllOrders,
  selectOrdersData,
  selectOrdersError,
  selectOrdersStatus,
} from "../features/orders/ordersSlice";

const columns = [
  {
    title: "S.No",
    dataIndex: "slNo",
    key: "slNo",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Payment Mode",
    dataIndex: "paymentMode",
    key: "paymentMode",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectOrdersStatus);
  const error = useSelector(selectOrdersError);
  const orders = useSelector(selectOrdersData);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const data = [];
  for (let i = 0; i < orders?.length; i++) {
    const { _id, user, paymentMode, status, products, total } = orders[i];
    data.push({
      key: _id,
      slNo: i + 1,
      user: user.firstname + " " + user.lastname,
      paymentMode,
      status,
      products,
      total,
    });
  }

  return (
    <>
      <h3 className="mb-4">Orders</h3>
      <TableComponent
        isLoading={status === "loading"}
        columns={columns}
        data={data}
      />
    </>
  );
};
export default Customers;
