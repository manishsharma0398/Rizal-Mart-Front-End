import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import TableComponent from "../../components/common-components/TableComponent";
import {
  getAllCoupons,
  selectCouponsData,
  selectCouponsError,
  selectCouponsStatus,
} from "../../features/coupon/couponSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";

const columns = [
  {
    title: "S.No",
    dataIndex: "slNo",
    key: "slNo",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    key: "expiry",
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

const CouponList = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectCouponsStatus);
  const error = useSelector(selectCouponsError);
  const coupons = useSelector(selectCouponsData);
  const userId = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCoupons());
  }, []);

  const data = [];
  for (let i = 0; i < coupons?.length; i++) {
    const { _id, name, expiry, discount, user } = coupons[i];

    data.push({
      key: _id,
      slNo: i + 1,
      name,
      expiry: new Date() > new Date(expiry) ? "Expired" : "Active",
      discount: discount + "%",
      actions: userId !== null && userId === user && (
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
      <h3 className="mb-4">Coupons</h3>
      <TableComponent
        isLoading={status === "loading"}
        columns={columns}
        data={data}
      />
    </>
  );
};
export default CouponList;
