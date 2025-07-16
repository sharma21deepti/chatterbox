import { Button, Form, Input, message, Modal } from "antd";
import { useSelector } from "react-redux";
import { useAddContactMutation } from "../../../../../redux/service/contactApiSlice";
import { useEffect, useState } from "react";
import { CommonModal } from "../../../../common/modal";

export const ContactModal = (props:any) => {
    const {onClose,open,setIsModalOpen,title,width} = props;
  const userId = useSelector((state: any) => state?.auth?.userId);
  const [messageApi,contextHolder] = message.useMessage();
  const [addContact, addContactInfo] = useAddContactMutation<any>();
  const [phone, setPhone] = useState();
  const handleAddContact = () => {
    addContact({ phone: phone, senderId: userId });
  };

  useEffect(() => {
    if(addContactInfo?.isSuccess) {
        messageApi.open({
            type:"success",
            content:"Contact Added Successfully"
        });

        onClose();

    }
    else if(addContactInfo?.isError) {
       messageApi.open({
      type: "error",
      content: addContactInfo?.error?.data?.message || "Error in adding contact",
    });
    }
  },[addContactInfo]);


  return (
    <>
    {contextHolder}
   <CommonModal isModalOpen={open} setIsModalOpen={setIsModalOpen} handleCancel={() => setIsModalOpen(false)} width="45vw" title="User Profile">
      <Form layout="horizontal">
        <Form.Item className="label" style={{ textAlign: "left" }}>
          Phone Number
        </Form.Item>
        <Input name="phone" className="input" type="number" onChange={(e: any) => setPhone(e?.target?.value)} />
        <Button htmlType="submit" color="pink" variant="filled" className="button" onClick={handleAddContact}>
          Add Contact
        </Button>
      </Form>
    </CommonModal>
    </>
  );
};
