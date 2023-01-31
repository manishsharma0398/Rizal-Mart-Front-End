import CustomInput from "../../components/common-components/CustomInput";

const AddColour = () => {
  return (
    <>
      <h3 className="mb-4">Add Colour</h3>
      <div className="">
        <form>
          <CustomInput type="color" label="Enter Colour" />
          <button className="btn btn-success border-0 rounded-3">
            Add Colour
          </button>
        </form>
      </div>
    </>
  );
};
export default AddColour;
