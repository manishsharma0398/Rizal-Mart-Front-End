import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import TableComponent from "../../components/common-components/TableComponent";
import {
  getAllCategories,
  selectCategoriesData,
  selectCategoriesError,
  selectCategoriesStatus,
} from "../../features/category/categorySlice";

const columns = [
  {
    title: "S.No",
    dataIndex: "slNo",
    key: "slNo",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.category - b.category,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const CategoryList = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectCategoriesStatus);
  const error = useSelector(selectCategoriesError);
  const categories = useSelector(selectCategoriesData);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const data = [];
  for (let i = 0; i < categories?.length; i++) {
    const { _id, category } = categories[i];

    data.push({
      key: _id,
      slNo: i + 1,
      category: category[0].toUpperCase() + category.slice(1),

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
      <h3 className="mb-4">Categories</h3>
      <TableComponent
        isLoading={status === "loading"}
        columns={columns}
        data={data}
      />
    </>
  );
};
export default CategoryList;
