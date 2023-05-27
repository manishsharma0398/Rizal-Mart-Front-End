import { privateRequest, publicRequest } from "../../utils/APIRequest";

const getOrders = async () => {
  const response = await publicRequest.get("/order");
  return response;
};

const createOrder = async (data) => {
  const response = await privateRequest.post("/order", data);
  return response;
};

const getAddress = async () => {
  const response = await privateRequest.get("/order/address");
  return response;
};

const addNewAddress = async (data) => {
  const response = await privateRequest.post("/order/address", data);
  return response;
};

const orderService = { getOrders, getAddress, addNewAddress, createOrder };

export default orderService;
