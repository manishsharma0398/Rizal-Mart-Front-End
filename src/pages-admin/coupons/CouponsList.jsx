import { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteCoupon,
  getAllCoupons,
  selectCouponsData,
  selectCouponsError,
  selectCouponsStatus,
} from "../../features/coupon/couponSlice";
import { selectUserData } from "../../features/auth/authSlice";

import TableComponent from "../../components/TableComponent";
import deleteModal from "../../components/modal/DeleteModal";

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

  const deleteCouponHandler = async (id) => {
    await dispatch(deleteCoupon(id));
  };

  const data = [];
  for (let i = 0; i < coupons?.length; i++) {
    const { _id, name, expiry, discount, discountType } = coupons[i];

    data.push({
      key: _id,
      slNo: i + 1,
      name,
      expiry: new Date() > new Date(expiry) ? "Expired" : "Active",
      discount: discountType === "money" ? "₹ " + discount : `${discount} %`,
      actions: (
        <div className="actions">
          <Link className="edit-action" to={`/admin/coupon-update/${_id}`}>
            <BiEdit size={20} />
          </Link>
          &nbsp; &nbsp;
          <button
            onClick={() => deleteModal(() => deleteCouponHandler(_id))}
            className="delete-action"
          >
            <AiFillDelete size={20} />
          </button>
        </div>
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
        isLoading={status === "loading" || status === "deleting"}
        columns={columns}
        data={data}
      />
    </>
  );
};
export default CouponList;
