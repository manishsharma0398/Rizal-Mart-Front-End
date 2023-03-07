import { privateRequest, publicRequest } from "../../utils/APIRequest";

const getCategories = async () => {
  const response = await publicRequest.get("/category");
  return response;
};

const getACategory = async (id) => {
  const response = await publicRequest.get(`/category/${id}`);
  return response;
};

const addCategory = async (newCategoryData) => {
  const response = await privateRequest.post("/category", newCategoryData);
  return response;
};

const updateCategory = async (data) => {
  const { id, ...other } = data;
  const response = await privateRequest.patch(`/category/${id}`, other);
  return response;
};

const deleteCategory = async (id) => {
  const response = await privateRequest.delete(`/category/${id}`);
  return response;
};

const categoryService = {
  addCategory,
  getACategory,
  getCategories,
  updateCategory,
  deleteCategory,
};

export default categoryService;
