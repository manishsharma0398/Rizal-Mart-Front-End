import { useState } from "react";
import "./Payment.scss";

const paymentOptions = [
  { title: "Cash On Delivery" },
  { title: "Internet Banking" },
  { title: "Credit Card" },
  { title: "Debit Card" },
  { title: "UPI" },
  { title: "Wallet" },
];

const Payment = ({ setDeliveryPaymentOPT }) => {
  const [selectedPaymentOpt, setSelectedPaymentOpt] = useState("");

  return (
    <div>
      <h3>Select Payment Option</h3>
      {paymentOptions.map((paymentOption, i) => {
        return (
          <div key={i}>
            <div className="left">
              <input
                type="radio"
                name="paymentOpt"
                id={paymentOption.title}
                value={paymentOption.title}
                checked={selectedPaymentOpt === paymentOption.title}
                onChange={(e) => {
                  setSelectedPaymentOpt(e.target.value);
                  setDeliveryPaymentOPT(e.target.value);
                }}
              />
            </div>
            <div className="right">
              <label htmlFor={paymentOption.title}>{paymentOption.title}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Payment;
