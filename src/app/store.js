import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth/authSlice";
import customerSlice from "../features/customers/customersSlice";
import productsSlice from "../features/product/productSlice";
import categorySlice from "../features/category/categorySlice";
import couponSlice from "../features/coupon/couponSlice";
import colourSlice from "../features/colours/colourSlice";
import enquiriesSlice from "../features/enquiry/enquirySlice";
import orderSlice from "../features/orders/ordersSlice";
import uploadSlice from "../features/upload/uploadSlice";

const store = configureStore({
  reducer: {
    user: authSlice,
    customer: customerSlice,
    products: productsSlice,
    categories: categorySlice,
    coupons: couponSlice,
    colours: colourSlice,
    enquiries: enquiriesSlice,
    orders: orderSlice,
    upload: uploadSlice,
  },
});

export default store;
