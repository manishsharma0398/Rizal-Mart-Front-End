import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import TableComponent from "../../components/common-components/TableComponent";
import {
  getAllProducts,
  selectProductsData,
  selectProductsError,
  selectProductsStatus,
} from "../../features/product/productSlice";

const columns = [
  {
    title: "S.No",
    dataIndex: "slNo",
    key: "slNo",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.category - b.category,
  },
  {
    title: "Colour",
    dataIndex: "color",
    key: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const products = useSelector(selectProductsData);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const data = [];
  for (let i = 0; i < products?.length; i++) {
    const { _id, title, price, brand, category, color } = products[i];

    data.push({
      key: _id,
      slNo: i + 1,
      title,
      price,
      brand,
      color,
      category,
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
      <h3 className="mb-4">Products</h3>
      <TableComponent
        isLoading={status === "loading"}
        columns={columns}
        data={data}
      />
    </>
  );
};
export default ProductList;
