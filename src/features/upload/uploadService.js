import { privateRequest, publicRequest } from "../../utils/APIRequest";

const uploadProductImages = async (images) => {
  console.log({ images });
  const response = await privateRequest.post(`/images`, images, axiosHeader);

  return response;
};

const uploadService = { uploadProductImages };

export default uploadService;
