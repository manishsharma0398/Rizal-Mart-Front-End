import { axiosHeader, makeRequest } from "../../utils/makeRequest";

const getProducts = async () => {
  const response = await makeRequest.get("/product");

  return response;
};

const addProduct = async (newProduct) => {
  const response = await makeRequest.post("/product", newProduct, axiosHeader);

  return response;
};

const productsService = { getProducts, addProduct };

export default productsService;
