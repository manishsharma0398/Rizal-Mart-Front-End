import { privateRequest, publicRequest } from "../../utils/APIRequest";
import { DEFAULT_GET_PRODUCT_LIMIT } from "../../utils/variables";

const getProducts = async (queries) => {
  const { categories, popular, featured, limit, page } = queries || {};
  const response = await publicRequest.get(
    `/products/?categories=${
      categories ? categories?.toString() : ""
    }&popular=${popular || ""}&featured=${featured || ""}&limit=${
      limit || DEFAULT_GET_PRODUCT_LIMIT
    }&page=${page || ""}`
  );
  return response;
};

const getAProduct = async (id) => {
  const response = await publicRequest.get(`/products/${id}`);
  return response;
};

const addProduct = async (newProduct) => {
  const response = await privateRequest.post("/products", newProduct);
  return response;
};

const deleteProduct = async (id) => {
  const response = await privateRequest.delete(`/products/${id}`);
  return response;
};

const productsService = { getProducts, addProduct, deleteProduct, getAProduct };

export default productsService;
