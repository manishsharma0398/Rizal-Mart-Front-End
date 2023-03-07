import { Tag } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllUsers,
  selectCustomerData,
  selectCustomerError,
  selectCustomerStatus,
} from "../features/customers/customersSlice";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

import Table from "../components/TableComponent";

const columns = [
  {
    title: "S.No",
    dataIndex: "slNo",
    key: "slNo",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    key: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectCustomerError);
  const status = useSelector(selectCustomerStatus);
  const customers = useSelector(selectCustomerData);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const data = [];
  for (let i = 0; i < customers?.length; i++) {
    const { _id, firstname, lastname, role, email, mobile } = customers[i];

    data.push({
      key: _id,
      slNo: i + 1,
      name: firstname + " " + lastname,
      role: (
        <Tag color={role === "admin" ? "#f50" : "#108ee9"}>
          {capitalizeFirstLetter(role)}
        </Tag>
      ),
      email: email,
      mobile: mobile,
    });
  }

  return (
    <>
      <h3 className="mb-4">Customers</h3>
      <Table isLoading={status === "loading"} columns={columns} data={data} />
    </>
  );
};

export default Customers;
