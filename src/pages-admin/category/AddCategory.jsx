import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";

import {
  resetReducer,
  addNewCategory,
  selectCategoriesError,
  selectCategoriesStatus,
} from "../../features/category/categorySlice";

import CustomInput from "../../components/common-components/CustomInput";

const AddCategory = () => {
  const loadingToast = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoriesError = useSelector(selectCategoriesError);
  const categoriesStatus = useSelector(selectCategoriesStatus);

  const notifyLoading = () =>
    (loadingToast.current = toast.loading("Adding New Category"));

  useEffect(() => {
    if (categoriesStatus === "loading") {
      notifyLoading();
    }
    if (categoriesStatus === "rejected") {
      toast.error(`${categoriesError}`);
      return;
    }
    if (categoriesStatus === "succeed") {
      toast.success("New Category added");
      return navigate("/admin/category-list");
    }
  }, [categoriesStatus]);

  const schema = yup.object({
    category: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values);
      await dispatch(addNewCategory(values));
      toast.dismiss(loadingToast.current);

      // if (couponStatus === "success" && couponError === null) {
      //   toast.success("New Coupon added");
      //   return navigate("/admin/coupon-list");
      // }
    },
  });

  return (
    <>
      <h3 className="mb-4">Add Category</h3>
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          {categoriesError && categoriesStatus === "rejected" && (
            <div className="error">{categoriesError}</div>
          )}

          <CustomInput
            type="text"
            label="Enter New Category"
            onChange={formik.handleChange("category")}
            value={formik.values.category}
          />
          <div className="error">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 mt-3"
          >
            Add Category
          </button>
        </form>
      </div>
    </>
  );
};
export default AddCategory;
