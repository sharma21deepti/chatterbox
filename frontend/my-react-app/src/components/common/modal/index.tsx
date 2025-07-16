import { Modal } from "antd";

export const CommonModal = (props: any) => {
  const { title, close, isModalOpen,setIsModalOpen, handleCancel, handleOk, children,width } = props;

  return (
    <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} closable={true} footer={null} width={width}>
      {children}  
    </Modal>
  );
};
