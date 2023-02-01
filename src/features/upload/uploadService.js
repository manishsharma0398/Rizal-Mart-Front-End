import { axiosHeader, makeRequest } from "../../utils/makeRequest";

const uploadProductImages = async (images) => {
  console.log({ images });
  const response = await makeRequest.post(`/images`, images, axiosHeader);

  return response;
};

const uploadService = { uploadProductImages };

export default uploadService;
