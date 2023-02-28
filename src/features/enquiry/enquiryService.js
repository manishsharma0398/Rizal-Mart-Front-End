import { privateRequest } from "../../utils/APIRequest";

const getEnquiries = async () => {
  const response = await privateRequest.get("/enquiries/all");

  return response;
};

const enquiryServices = { getEnquiries };

export default enquiryServices;
