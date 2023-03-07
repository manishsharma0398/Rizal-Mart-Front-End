import * as yup from "yup";
import moment from "moment";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  getACoupon,
  addNewCoupon,
  updateCoupon,
  clearSingleCoupon,
  selectSingleCoupon,
  selectSingleCouponError,
  selectSingleCouponStatus,
} from "../../features/coupon/couponSlice";

import Feedback from "../../components/feedback/Feedback";
import CustomInput from "../../components/custom-input/CustomInput";

const AddCoupon = () => {
  const loadingToast = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleCoupon = useSelector(selectSingleCoupon);
  const singleCouponErr = useSelector(selectSingleCouponError);
  const singleCouponStatus = useSelector(selectSingleCouponStatus);

  const editCouponMode = useParams().couponId;

  useEffect(() => {
    dispatch(clearSingleCoupon());
    if (editCouponMode) dispatch(getACoupon(editCouponMode));
  }, []);

  const notifyLoading = () =>
    (loadingToast.current = toast.loading("Adding New Coupon"));

  const schema = yup.object({
    // ? only uppercase and _ allowed
    name: yup.string().uppercase("only uppercase").required("Required"),
    expiry: yup.date().required("Required"),
    discount: yup.number().required("Required"),
    discountType: yup.string().required("Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: singleCoupon?.name || "",
      expiry: moment(singleCoupon?.expiry).format().split("T")[0] || "",
      discount: singleCoupon?.discount || "",
      discountType: singleCoupon?.discountType || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      notifyLoading();
      if (editCouponMode) {
        await dispatch(updateCoupon({ ...values, id: editCouponMode }));
      } else {
        await dispatch(addNewCoupon(values));
      }
      toast.dismiss(loadingToast.current);

      if (singleCouponStatus === "rejected")
        return toast.error(`${couponError}`);

      if (singleCouponStatus === "succeed") toast.success("New coupon added");

      if (singleCouponStatus === "updated") toast.success("Coupon updated");

      if (singleCouponStatus === "succeed" || singleCouponStatus === "updated")
        return navigate("/admin/coupon-list");
    },
  });

  return (
    <>
      <h3 className="mb-4"> {editCouponMode ? "Update" : "Add"} Coupon</h3>
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          {singleCouponErr && <Feedback msg={singleCouponErr} type="error" />}

          <CustomInput
            type="text"
            label="Enter Coupon Name (UPPERCASE)"
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
            className="dropdown"
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

          <button type="submit" className="cta">
            {editCouponMode ? "Update" : "Add"} Coupon
          </button>
        </form>
      </div>
    </>
  );
};
export default AddCoupon;
