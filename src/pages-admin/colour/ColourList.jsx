import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import TableComponent from "../../components/common-components/TableComponent";
import {
  getAllColours,
  selectColoursData,
  selectColoursError,
  selectColoursStatus,
} from "../../features/colours/colourSlice";

const columns = [
  {
    title: "S.No",
    dataIndex: "slNo",
    key: "slNo",
  },
  {
    title: "Colours",
    dataIndex: "colours",
    key: "colours",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const ColoursList = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectColoursStatus);
  const error = useSelector(selectColoursError);
  const colours = useSelector(selectColoursData);

  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getAllColours());
  }, []);

  const data = [];
  for (let i = 0; i < colours?.length; i++) {
    const { _id, category: color } = colours[i];

    data.push({
      key: _id,
      slNo: i + 1,
      colours: color[0].toUpperCase() + color.slice(1),

      action: (
        <>
          <Link to={`/edit/product/${_id}`}>
            <BiEdit className="fs-4" />
          </Link>
          <Link className="text-danger ms-3" to={`/delete/product/${_id}`}>
            <AiFillDelete className="fs-4" />
          </Link>
        </>
      ),
    });
  }

  return (
    <>
      <h3 className="mb-4">Colours</h3>
      <TableComponent
        isLoading={status === "loading"}
        columns={columns}
        data={data}
      />
    </>
  );
};
export default ColoursList;
