import { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteCategory,
  getAllCategories,
  selectCategoriesData,
  selectCategoriesError,
  selectCategoriesStatus,
} from "../../features/category/categorySlice";

import TableComponent from "../../components/TableComponent";
import deleteModal from "../../components/modal/DeleteModal";

import "./Category.scss";

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
    defaultSortOrder: "",
    sorter: (a, b) => a.category.localeCompare(b.category),
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

  const deleteCatHandler = async (id) => {
    await dispatch(deleteCategory(id));
  };

  const data = [];
  for (let i = 0; i < categories?.length; i++) {
    const { _id, category } = categories[i];

    data.push({
      key: _id,
      slNo: i + 1,
      category: category[0].toUpperCase() + category.slice(1),

      action: (
        <div className="actions">
          <Link className="edit-action" to={`/admin/category-update/${_id}`}>
            <BiEdit />
          </Link>
          <button
            className="delete-action"
            onClick={() => deleteModal(() => deleteCatHandler(_id), "category")}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  return (
    <>
      {/* <AddCategory /> */}
      <h3 className="">Categories</h3>
      <TableComponent
        isLoading={status === "loading" || status === "deleting"}
        columns={columns}
        data={data}
      />
    </>
  );
};
export default CategoryList;
