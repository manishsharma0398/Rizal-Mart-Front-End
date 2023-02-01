import CustomInput from "../../components/common-components/CustomInput";

const AddCoupon = () => {
  return (
    <>
      <h3 className="mb-4">Add Coupon</h3>
      <div className="">
        <form>
          <CustomInput type="text" label="Enter Coupon" />
          <button className="btn btn-success border-0 rounded-3">
            Add Coupon
          </button>
        </form>
      </div>
    </>
  );
};
export default AddCoupon;
