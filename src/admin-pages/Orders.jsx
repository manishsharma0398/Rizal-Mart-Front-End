import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
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
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Order Date",
    dataIndex: "orderedAt",
    key: "orderedAt",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Total Amount",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "Order Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Payment Mode",
    dataIndex: "paymentMode",
    key: "paymentMode",
  },
  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
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
    const { _id, user, paymentMode, status, total, createdAt } = orders[i];
    data.push({
      key: _id,
      slNo: i + 1,
      orderId: _id,
      orderedAt: createdAt,
      customer: user,
      status,
      total,
      paymentMode,
      action: (
        <>
          <Link to={`/edit/product/${_id}`}>
            <BiEdit className="fs-4" />
          </Link>
          <Link className="text-danger ms-3" to={`/delete/product/${_id}`}>
            <AiFillDelete className="fs-4" />
          </Link>
        </>
      ),
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
