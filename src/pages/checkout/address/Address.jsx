import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Feedback from "../../../components/feedback/Feedback";
import CustomInput from "../../../components/custom-input/CustomInput";

import {
  addAddress,
  getAddress,
  selectUserAddresses,
} from "../../../features/orders/ordersSlice";

import "./Address.scss";

const Address = ({ setDeliveryAddress }) => {
  const { address, status, error } = useSelector(selectUserAddresses);
  const [addNewAddressForm, setAddNewAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddress());
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      landmark: "",
      city: "",
      district: "",
      pincode: "",
      state: "",
      mobileOne: "",
      mobileTwo: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(addAddress(values));
    },
  });

  return (
    <div>
      {address === null && (
        <>
          <h3>You have not added any addresses</h3>
        </>
      )}

      {address &&
        address?.addresses?.map((address) => {
          return (
            <div key={address?._id}>
              <div className="left">
                <input
                  type="radio"
                  name="selectedAddress"
                  id={address?._id}
                  checked={address?._id === selectedAddress}
                  value={address?._id}
                  onChange={(e) => {
                    setSelectedAddress(e.target.value);
                    setDeliveryAddress(e.target.value);
                  }}
                />
              </div>

              <div className="right">
                <label htmlFor={address?._id}>
                  <span>Deliver to {address?.name}</span>
                  <span>{address?.landmark}</span> <br />
                  <span>{address?.address}</span>
                  <br />
                  <span>{address?.city}</span>
                  <br />
                  <span>{address?.district}</span>
                  <br />
                  <span>
                    {address?.state}-{address?.pincode}
                  </span>
                  <span>{address?.mobileOne}</span>
                  <span>{address?.mobileTwo}</span>
                </label>
              </div>
            </div>
          );
        })}

      {addNewAddressForm && (
        <div className="auth-form-container">
          <form onSubmit={formik.handleSubmit} className="auth-form">
            <button onClick={() => setAddNewAddressForm(false)}>
              Close Form
            </button>
            <div className="form-heading">
              <span className="desc">Add New Address</span>
            </div>

            {status === "rejected" && error && (
              <Feedback msg={error} type="error" />
            )}

            <div className="inputs">
              <CustomInput
                id="name"
                label="Full Name"
                error={formik.errors.name}
                value={formik.values.name}
                touched={formik.touched.name}
                onChange={formik.handleChange}
              />

              <CustomInput
                id="address"
                label="Address"
                error={formik.errors.address}
                value={formik.values.address}
                touched={formik.touched.address}
                onChange={formik.handleChange}
              />

              <CustomInput
                id="landmark"
                label="Landmark"
                error={formik.errors.landmark}
                value={formik.values.landmark}
                touched={formik.touched.landmark}
                onChange={formik.handleChange}
              />
              <CustomInput
                id="city"
                label="City"
                error={formik.errors.city}
                value={formik.values.city}
                touched={formik.touched.city}
                onChange={formik.handleChange}
              />
              <CustomInput
                id="district"
                label="District"
                error={formik.errors.district}
                value={formik.values.district}
                touched={formik.touched.district}
                onChange={formik.handleChange}
              />
              <CustomInput
                id="pincode"
                label="Pincode"
                error={formik.errors.pincode}
                value={formik.values.pincode}
                touched={formik.touched.pincode}
                onChange={formik.handleChange}
              />
              <CustomInput
                id="state"
                label="State"
                error={formik.errors.state}
                value={formik.values.state}
                touched={formik.touched.state}
                onChange={formik.handleChange}
              />
              <CustomInput
                id="mobileOne"
                label="Mobile Number 1"
                error={formik.errors.mobileOne}
                value={formik.values.mobileOne}
                touched={formik.touched.mobileOne}
                onChange={formik.handleChange}
              />
              <CustomInput
                id="mobileTwo"
                label="Mobile Number 2"
                error={formik.errors.mobileTwo}
                value={formik.values.mobileTwo}
                touched={formik.touched.mobileTwo}
                onChange={formik.handleChange}
              />
            </div>

            <Link
              className="forgot-password small"
              to="/forgot-password"
            ></Link>

            <button type="submit" disabled={status === "loading"}>
              Add Address
            </button>
          </form>
        </div>
      )}

      {!addNewAddressForm && (
        <button onClick={() => setAddNewAddressForm(true)}>
          Add new address
        </button>
      )}
    </div>
  );
};
export default Address;
