import CustomInput from "../../components/common-components/CustomInput";

const AddCategory = () => {
  return (
    <>
      <h3 className="mb-4">Add Category</h3>
      <div className="">
        <form>
          <CustomInput type="text" label="Enter Category" />
          <button className="btn btn-success border-0 rounded-3">
            Add Category
          </button>
        </form>
      </div>
    </>
  );
};
export default AddCategory;
