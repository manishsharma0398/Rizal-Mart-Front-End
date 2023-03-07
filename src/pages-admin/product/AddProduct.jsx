import * as yup from "yup";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllCategories,
  selectCategoriesData,
} from "../../features/category/categorySlice";
import {
  addNewProduct,
  clearSingleProduct,
  getAProduct,
  selectSingleProduct,
  selectSingleProductError,
  selectSingleProductStatus,
} from "../../features/product/productSlice";

import Feedback from "../../components/feedback/Feedback";
import CustomInput from "../../components/custom-input/CustomInput";

import "react-quill/dist/quill.snow.css";

const AddProduct = () => {
  const [imagesToUpload, setImagesToUpload] = useState([]);

  const navigate = useNavigate();
  const addingProductReference = useRef(null);

  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesData);

  const product = useSelector(selectSingleProduct);
  const productError = useSelector(selectSingleProductError);
  const productStatus = useSelector(selectSingleProductStatus);

  const editProductMode = useParams().productId;

  useEffect(() => {
    dispatch(clearSingleProduct());
    dispatch(getAllCategories());
    if (editProductMode) {
      dispatch(getAProduct(editProductMode));
    }
  }, []);

  const addingProducts = () =>
    (addingProductReference.current = toast.loading("Product Adding"));

  useEffect(() => {
    // dispatch(getAllColours());
  }, []);

  useEffect(() => {
    if (productStatus === "success") {
      toast.success("Product Added Successfully");
    }
    if (productStatus === "rejected") {
      toast.error("Cannot add new products");
    }
  }, [productStatus]);

  const schema = yup.object({
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
    brand: yup.string().required("Required"),
    price: yup.number().required("Required"),
    fakePrice: yup.number().required("Required"),
    limit: yup.number().required("Required"),
    quantity: yup.number(),
    fakeQuantity: yup.number(),
    category: yup.string().required("Required"),
    color: yup.string().required("Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: product?.title || "",
      description: product?.description || "",
      brand: product?.brand || "",
      price: product?.price || "",
      fakePrice: product?.fakePrice || "",
      limit: product?.limit || "",
      category: product?.category || "",
      color: product?.color || "",
      quantity: product?.quantity || "",
      fakeQuantity: product?.fakeQuantity || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      addingProducts();

      // console.log({ imagesToUpload });
      // await dispatch(uploadImages(imagesToUpload));
      // toast.dismiss(imagesUploadingReference.current);

      // if (imageUploadingStatus === "rejected") {
      //   toast.dismiss(addingProductReference.current);
      // }

      const newProduct = { ...values, images: imagesToUpload };
      // console.log(newProduct);
      await dispatch(addNewProduct(newProduct));
      toast.dismiss(addingProductReference.current);
      if (productStatus === "added") {
        return navigate("/admin/product-list");
      }
    },
  });

  return (
    <>
      <h3 className="mb-4">Add Product</h3>
      <form onSubmit={formik.handleSubmit}>
        {productError && <Feedback msg={productError} type="error" />}
        <CustomInput
          required
          id="title"
          label="Title"
          value={formik.values.title}
          error={formik.errors.title}
          touched={formik.touched.title}
          onChange={formik.handleChange}
        />

        <div className="mt-3">
          {" "}
          <ReactQuill
            placeholder="Enter Product Description Here"
            theme="snow"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </div>
        </div>

        <CustomInput
          required
          id="brand"
          label="Brand"
          value={formik.values.brand}
          error={formik.errors.brand}
          touched={formik.touched.brand}
          onChange={formik.handleChange}
        />

        <CustomInput
          required
          id="price"
          type="number"
          label="Price"
          value={formik.values.price}
          error={formik.errors.price}
          touched={formik.touched.price}
          onChange={formik.handleChange}
        />

        <CustomInput
          required
          type="number"
          label="Fake Price"
          id="fakePrice"
          onChange={formik.handleChange}
          value={formik.values.fakePrice}
          error={formik.errors.fakePrice}
          touched={formik.touched.fakePrice}
        />

        <CustomInput
          id="quantity"
          type="number"
          label="Quantity"
          onChange={formik.handleChange}
          value={formik.values.quantity}
          error={formik.errors.quantity}
          touched={formik.touched.quantity}
        />

        <CustomInput
          type="number"
          id="fakeQuantity"
          label="Fake Quantity"
          onChange={formik.handleChange}
          value={formik.values.fakeQuantity}
          error={formik.errors.fakeQuantity}
          touched={formik.touched.fakeQuantity}
        />

        <CustomInput
          required
          id="limit"
          type="number"
          label="Limit"
          value={formik.values.limit}
          error={formik.errors.limit}
          touched={formik.touched.limit}
          onChange={formik.handleChange}
        />

        <select
          className="form-control py-3 mt-3"
          name="category"
          id=""
          value={formik.values.category}
          onChange={formik.handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.category}
              </option>
            );
          })}
        </select>
        <div className="error">
          {formik.touched.category && formik.errors.category ? (
            <div>{formik.errors.category}</div>
          ) : null}
        </div>

        <CustomInput
          label="Colour"
          id="color"
          value={formik.values.color}
          error={formik.errors.color}
          touched={formik.touched.color}
          onChange={formik.handleChange}
        />

        <div
          style={{
            border: "1px solid gray",
            borderRadius: "4px",
            overflow: "hidden",
          }}
          className="bg-light py-5 mt-3 text-center"
        >
          <Dropzone
            onDrop={(acceptedFiles) => {
              const allImages = new Set(acceptedFiles.concat(imagesToUpload));

              return setImagesToUpload(Array.from(allImages));
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <p className="m-0 p-0 mt-3 mb-1">Images:</p>
        <div
          style={{
            border: "1px solid gray",
            borderRadius: "4px",
            overflow: "hidden",
            minHeight: "233px",
          }}
          className="bg-light p-3 text-center d-flex flex-wrap gap-3"
        >
          {!imagesToUpload || imagesToUpload?.length < 1 ? (
            <div className="d-flex justify-content-center align-items-center w-100">
              <p className="m-0 p-0 text-center">No Images Selected</p>
            </div>
          ) : (
            imagesToUpload?.map((image, index) => (
              <div key={index} className="position-relative">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const images = imagesToUpload.filter(
                      (_, imgIndex) => imgIndex !== index
                    );
                    setImagesToUpload(images);
                  }}
                  style={{ top: "10px", right: "10px" }}
                  className="btn-close position-absolute btn-dark"
                ></button>
                <img
                  height={200}
                  width={200}
                  className="w-100"
                  src={URL.createObjectURL(image)}
                  alt=""
                />
              </div>
            ))
          )}
        </div>
        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 mt-3"
        >
          Add Product
        </button>
      </form>
    </>
  );
};
export default AddProduct;
