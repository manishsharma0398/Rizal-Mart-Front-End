import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllEnquiries,
  selectEnquiriesData,
  selectEnquiriesError,
  selectEnquiriesStatus,
} from "../features/enquiry/enquirySlice";

import TableComponent from "../components/TableComponent";

const columns = [
  {
    title: "S.No",
    dataIndex: "slNo",
    key: "slNo",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Payment Mode",
    dataIndex: "paymentMode",
    key: "paymentMode",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectEnquiriesStatus);
  const error = useSelector(selectEnquiriesError);
  const enquiries = useSelector(selectEnquiriesData);

  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getAllEnquiries());
  }, []);

  const data = [];
  for (let i = 0; i < enquiries?.length; i++) {
    const { _id, user, paymentMode, status, products, total } = enquiries[i];
    data.push({
      key: _id,
      slNo: i + 1,
      user: user.firstname + " " + user.lastname,
      paymentMode,
      status,
      products,
      total,
    });
  }

  return (
    <>
      <h3 className="mb-4">Enquiries</h3>
      <TableComponent
        isLoading={status === "loading"}
        columns={columns}
        data={data}
      />
    </>
  );
};
export default Enquiries;
