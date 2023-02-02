import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { Multiselect } from "react-widgets";
import { toast } from "react-toastify";

import {
  getAllCategories,
  selectCategoriesData,
} from "../../features/category/categorySlice";
import {
  getAllColours,
  selectColoursData,
} from "../../features/colours/colourSlice";
import {
  selectUploadImagesData,
  selectUploadImagesError,
  selectUploadImagesStatus,
  uploadImages,
} from "../../features/upload/uploadSlice";
import {
  addNewProduct,
  selectProductsData,
  selectProductsError,
  selectProductsStatus,
} from "../../features/product/productSlice";

import CustomInput from "../../components/common-components/CustomInput";

import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesData);
  const colours = useSelector(selectColoursData);
  const productStatus = useSelector(selectProductsStatus);
  const productError = useSelector(selectProductsError);
  const products = useSelector(selectProductsData);
  const uploadedImagesLink = useSelector(selectUploadImagesData);
  const imageUploadingError = useSelector(selectUploadImagesError);
  const imageUploadingStatus = useSelector(selectUploadImagesStatus);

  const [imagesToUpload, setImagesToUpload] = useState([]);

  const navigate = useNavigate();
  const imagesUploadingReference = useRef(null);
  const addingProductReference = useRef(null);

  const uploadingImages = () =>
    (imagesUploadingReference.current = toast.loading("Uploading Images"));
  const addingProducts = () =>
    (addingProductReference.current = toast.loading("Product Adding"));

  useEffect(() => {
    dispatch(getAllCategories());
    // dispatch(getAllColours());
  }, []);

  useEffect(() => {
    if (productStatus === "success") {
      toast.success("Product Added Successfully");
    }
    if (productStatus === "rejected") {
      toast.error("Cannot add new products");
    }
    if (productStatus === "loading") {
      addingProducts();
    }
  }, [productStatus]);

  useEffect(() => {
    if (imageUploadingStatus === "rejected") {
      toast.error("Cannot upload images");
    }
    if (imageUploadingStatus === "loading") {
      uploadingImages();
    }
  }, [imageUploadingStatus]);

  const schema = yup.object({
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
    brand: yup.string().required("Required"),
    price: yup.number().required("Required"),
    fakePrice: yup.number().required("Required"),
    limit: yup.number().required("Required"),
    category: yup.string().required("Required"),
    color: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      brand: "",
      price: "",
      fakePrice: "",
      limit: "",
      category: "",
      color: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log({ imagesToUpload });
      await dispatch(uploadImages(imagesToUpload));
      toast.dismiss(imagesUploadingReference.current);
      if (imageUploadingStatus === "rejected") {
        toast.dismiss(addingProductReference.current);
      }
      const newProduct = { ...values, images: uploadedImagesLink };
      console.log(newProduct);
      await dispatch(addNewProduct(newProduct));
      toast.dismiss(addingProductReference.current);
      if (productStatus !== "rejected") {
        return navigate("/admin/product-list");
      }
    },
  });

  return (
    <>
      <h3 className="mb-4">Add Product</h3>
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            label="Title"
            id="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
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
            label="Brand"
            id="brand"
            onChange={formik.handleChange}
            value={formik.values.brand}
          />
          <div className="error">
            {formik.touched.brand && formik.errors.brand ? (
              <div>{formik.errors.brand}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            label="Price"
            id="price"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            label="Fake Price"
            id="fakePrice"
            onChange={formik.handleChange}
            value={formik.values.fakePrice}
          />
          <div className="error">
            {formik.touched.fakePrice && formik.errors.fakePrice ? (
              <div>{formik.errors.fakePrice}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            label="Limit"
            id="limit"
            onChange={formik.handleChange}
            value={formik.values.limit}
          />
          <div className="error">
            {formik.touched.limit && formik.errors.limit ? (
              <div>{formik.errors.limit}</div>
            ) : null}
          </div>
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
          {/* afterwards  */}
          {/* <Multiselect
            className="mt-3"
            value={formik.values.color}
            onChange={formik.handleChange}
            placeholder="Select Product Colour"
            dataKey="id"
            textField="color"
            data={colours}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color ? (
              <div>{formik.errors.color}</div>
            ) : null}
          </div> */}
          <CustomInput
            label="Colour"
            id="color"
            onChange={formik.handleChange}
            value={formik.values.color}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color ? (
              <div>{formik.errors.color}</div>
            ) : null}
          </div>
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
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
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
      </div>
    </>
  );
};
export default AddProduct;
