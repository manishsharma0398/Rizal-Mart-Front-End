import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import {
  addNewCoupon,
  selectCouponsError,
  selectCouponsStatus,
} from "../../features/coupon/couponSlice";

import CustomInput from "../../components/common-components/CustomInput";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCoupon = () => {
  const loadingToast = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const couponError = useSelector(selectCouponsError);
  const couponStatus = useSelector(selectCouponsStatus);

  const notifyLoading = () =>
    (loadingToast.current = toast.loading("Adding New Coupon"));

  useEffect(() => {
    if (couponStatus === "loading") {
      notifyLoading();
    }
    if (couponStatus === "rejected") {
      toast.error(`${couponError}`);
      return;
    }
    if (couponStatus === "succeed") {
      toast.success("New coupon added");
      return navigate("/admin/coupon-list");
    }
  }, [couponStatus]);

  const schema = yup.object({
    // ? only uppercase and _ allowed
    name: yup.string().uppercase("only uppercase").required("Required"),
    expiry: yup.date().required("Required"),
    discount: yup.number().required("Required"),
    discountType: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
      discountType: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values);
      await dispatch(addNewCoupon(values));
      toast.dismiss(loadingToast.current);
    },
  });

  return (
    <>
      <h3 className="mb-4">Add Coupon</h3>
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          {couponError && couponStatus === "rejected" && (
            <div className="error">{couponError}</div>
          )}

          <CustomInput
            type="text"
            label="Enter Coupon Name"
            onChange={formik.handleChange("name")}
            value={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>
          <CustomInput
            type="date"
            label="Enter Expiry Date"
            onChange={formik.handleChange("expiry")}
            value={formik.values.expiry}
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry ? (
              <div>{formik.errors.expiry}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            label="Enter Discount"
            onChange={formik.handleChange("discount")}
            value={formik.values.discount}
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount ? (
              <div>{formik.errors.discount}</div>
            ) : null}
          </div>

          <select
            className="form-control py-3 mt-3"
            name="discountType"
            id="discountType"
            value={formik.values.discountType}
            onChange={formik.handleChange}
          >
            <option value="">Select Discount Type</option>
            {[
              { val: "percent", label: "% (Percentage)" },
              { val: "money", label: "₹ (Money)" },
            ].map((s, id) => {
              return (
                <option key={id} value={s.val}>
                  {s.label}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.discountType && formik.errors.discountType ? (
              <div>{formik.errors.discountType}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 mt-3"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </>
  );
};
export default AddCoupon;
