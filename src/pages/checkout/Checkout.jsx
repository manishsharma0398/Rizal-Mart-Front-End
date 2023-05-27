import { message, Steps } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  createOrder,
  selectOrderProducts,
} from "../../features/orders/ordersSlice";
import Address from "./address/Address";

import CheckoutProducts from "./checkout-products/CheckoutProducts";

import "./Checkout.scss";
import Payment from "./payment/Payment";

const steps = [
  {
    title: "Products",
  },
  {
    title: "Deliver To",
  },
  {
    title: "Payment",
  },
];

const Checkout = () => {
  const fromCart = useLocation()?.state?.fromCart;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const orderProducts = useSelector(selectOrderProducts);

  const [checkoutOptions, setCheckoutOptions] = useState({
    deliveryAddress: null,
    paymentOpt: null,
  });

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const setDeliveryAddress = (data) => {
    setCheckoutOptions({ ...checkoutOptions, deliveryAddress: data });
  };

  const setDeliveryPaymentOPT = (data) => {
    setCheckoutOptions({ ...checkoutOptions, paymentOpt: data });
  };

  const checkOutDone = () => {
    // console.log(checkoutOptions, orderProducts);
    const { deliveryAddress, paymentOpt } = checkoutOptions;
    dispatch(
      createOrder({
        products: orderProducts,
        addressId: deliveryAddress,
        paymentType: paymentOpt,
      })
    );
  };

  return (
    <div className="checkout">
      <Steps
        current={currentPage}
        items={steps.map((step, i) => ({
          key: i,
          title: step.title,
        }))}
      />
      {currentPage === 0 && <CheckoutProducts fromCart={fromCart} />}
      {currentPage === 1 && <Address setDeliveryAddress={setDeliveryAddress} />}
      {currentPage === 2 && (
        <Payment setDeliveryPaymentOPT={setDeliveryPaymentOPT} />
      )}
      <div
        style={{
          marginTop: 24,
        }}
      >
        {currentPage > 0 && (
          <button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prevPage()}
          >
            Previous
          </button>
        )}
        {currentPage < steps.length - 1 && (
          <button type="primary" onClick={() => nextPage()}>
            Next
          </button>
        )}
        {currentPage === steps.length - 1 && (
          <button
            type="primary"
            onClick={() => {
              message.success("Processing complete!");
              checkOutDone();
            }}
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};
export default Checkout;
