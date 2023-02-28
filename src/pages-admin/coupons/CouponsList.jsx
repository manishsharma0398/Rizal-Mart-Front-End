import { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllCoupons,
  selectCouponsData,
  selectCouponsError,
  selectCouponsStatus,
} from "../../features/coupon/couponSlice";
import { selectUserData } from "../../features/auth/authSlice";

import TableComponent from "../../components/TableComponent";

import "./Coupons.scss";

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
  const userId = useSelector(selectUserData);

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
      actions: (
        <>
          <Link to={`/edit/product/${_id}`}>
            <BiEdit size={20} />
          </Link>
          &nbsp; &nbsp;
          <Link className="text-danger ms-3" to={`/delete/product/${_id}`}>
            <AiFillDelete size={20} />
          </Link>
        </>
      ),
    });
  }

  return (
    <>
      <h3 className="">Coupons</h3>
      <Link to="/admin/coupon-add" className="cta add-coupon">
        Add Coupon
      </Link>
      <TableComponent
        isLoading={status === "loading"}
        columns={columns}
        data={data}
      />
    </>
  );
};
export default CouponList;
