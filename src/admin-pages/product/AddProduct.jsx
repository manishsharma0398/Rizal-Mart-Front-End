import CustomInput from "../../components/common-components/CustomInput";

const AddProduct = () => {
  return (
    <>
      <h3 className="mb-4">Add Product</h3>
      <div className="">
        <form>
          <CustomInput type="text" label="Title" id="title" />
          <CustomInput type="text" label="Title" id="title" />
          <button className="btn btn-success border-0 rounded-3">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};
export default AddProduct;
