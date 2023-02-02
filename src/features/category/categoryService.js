import axios from "axios";
import { axiosHeader, base_url, makeRequest } from "../../utils/makeRequest";

const getCategories = async () => {
  const response = await makeRequest.get("/category");

  return response;
};

const addCategory = async (newCategoryData) => {
  const response = await makeRequest.post(
    "/category",
    newCategoryData,
    axiosHeader
  );

  return response;
};

const categoryService = { getCategories, addCategory };

export default categoryService;
