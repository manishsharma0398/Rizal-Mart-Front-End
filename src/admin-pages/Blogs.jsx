import TableComponent from "../components/common-components/TableComponent";

const columns = [
  {
    title: "S.No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    status: "Processing",
    product: `London, Park Lane no. ${i}`,
  });
}

const Blogs = () => {
  return (
    <>
      <h3 className="mb-4">Blogs</h3>
      <TableComponent columns={columns} data={data} />
    </>
  );
};
export default Blogs;
