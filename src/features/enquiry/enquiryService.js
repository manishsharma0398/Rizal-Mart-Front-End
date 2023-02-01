import { makeRequest } from "../../utils/makeRequest";

const getEnquiries = async () => {
  const response = await makeRequest.get("/enquiries/all");

  return response;
};

const enquiryServices = { getEnquiries };

export default enquiryServices;
