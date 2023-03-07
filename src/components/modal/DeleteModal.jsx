import { Modal } from "antd";
const { confirm } = Modal;

import { ExclamationCircleFilled } from "@ant-design/icons";

const deleteModal = (onDeleteClick, title) =>
  confirm({
    title: `Are you sure delete this ${title} ?`,
    icon: <ExclamationCircleFilled />,
    // content: "Some descriptions",
    okText: "Delete",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      onDeleteClick();
    },
    onCancel() {},
  });

export default deleteModal;
