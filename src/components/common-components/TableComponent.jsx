import { Table } from "antd";

const App = ({ columns, data }) => {
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      ></div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default App;
