import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addNewCategory,
  clearSingleCategory,
  getACategory,
  selectSingleCategoryData,
  selectSingleCategoryError,
  selectSingleCategoryStatus,
  updateCategory,
} from "../../features/category/categorySlice";

import CustomInput from "../../components/custom-input/CustomInput";

import "./Category.scss";

const AddCategory = () => {
  const loadingToast = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = useSelector(selectSingleCategoryData);
  const categoriesError = useSelector(selectSingleCategoryError);
  const categoriesStatus = useSelector(selectSingleCategoryStatus);

  const editCategoryMode = useParams().categoryId;

  useEffect(() => {
    dispatch(clearSingleCategory());
    if (editCategoryMode) dispatch(getACategory(editCategoryMode));
  }, []);

  const notifyLoading = () =>
    (loadingToast.current = toast.loading("Adding New Category"));

  useEffect(() => {
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
    enableReinitialize: true,
    initialValues: {
      category: category?.category || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      notifyLoading();

      if (editCategoryMode) {
        await dispatch(updateCategory({ ...values, id: editCategoryMode }));
      } else {
        await dispatch(addNewCategory(values));
      }

      toast.dismiss(loadingToast.current);

      // if (couponStatus === "success" && couponError === null) {
      //   toast.success("New Coupon added");
      //   return navigate("/admin/coupon-list");
      // }
    },
  });

  return (
    <>
      <h3>{editCategoryMode ? "Update" : "Add"} Category</h3>

      {categoriesError && categoriesStatus === "rejected" && (
        <div className="error">{categoriesError}</div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          label={!editCategoryMode ? "Enter New Category" : "Enter Category"}
          value={formik.values.category}
          error={formik.errors.category}
          touched={formik.touched.category}
          onChange={formik.handleChange("category")}
        />

        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 mt-3"
        >
          {editCategoryMode ? "Update" : "Add"} Category
        </button>
      </form>
    </>
  );
};
export default AddCategory;
