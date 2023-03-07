import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteProduct,
  getAllProducts,
  selectProductsData,
  selectProductsError,
  selectProductsStatus,
} from "../../features/product/productSlice";

import deleteModal from "../../components/modal/DeleteModal";

import TableComponent from "../../components/TableComponent";

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

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const deleteProductHandler = async (id) => {
    await dispatch(deleteProduct(id));
  };

  const data = [];
  for (let i = 0; i < products?.length; i++) {
    const { _id, title, price, brand, category, color } = products[i] || {};

    data.push({
      key: _id,
      slNo: i + 1,
      title,
      price,
      brand,
      color,
      category: (
        <span key={category._id} className="text-primary">
          {category.category}
        </span>
      ),
      action: (
        <div className="actions">
          <Link className="edit-action" to={`/admin/product-update/${_id}`}>
            <BiEdit />
          </Link>
          <button
            className="delete-action"
            onClick={() =>
              deleteModal(() => deleteProductHandler(_id), "Product")
            }
          >
            <AiFillDelete />
          </button>
        </div>
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
