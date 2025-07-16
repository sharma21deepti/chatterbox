import { Button, Col, ConfigProvider, Form, message, Row, Segmented } from "antd";
import { CustomInput } from "../../../common/input";
import { CommonModal } from "../../../common/modal";
import { useEffect, useState } from "react";
import "./style.css";
import { ContactModal } from "../addContact/modal";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useUpdateUserMutation } from "../../../../redux/service/loginApiSlice";

export const Profile = (props: any) => {
  const { isModalOpen, setIsModalOpen, data,updateUserInfo,updateUser } = props;

  const [form] = Form.useForm();
  const [openContactModal, setOpenContactModal] = useState(false);
  const [formData, setFormData] = useState<any>();
  const [mode, setMode] = useState("light");
  const [gender, setGender] = useState("male");
  const [messageApi,contextHolder] = message.useMessage();

  // const [updateUser,updateUserInfo] = useUpdateUserMutation({});




  const handleUpdateProfile = () => {
     const { userName, phone,email ,gender,mode} = form.getFieldsValue();
    const payload = {
      id:data?._id,
      userName, phone,email ,gender,mode
    };
  updateUser(payload);
  };

  const handleAddContact = () => {
    setOpenContactModal(true);
  };
  const handleContactModalClose = () => {
    setOpenContactModal(false);
  };
  console.log(data, "data>>>");

  useEffect(() => {
    if (data) {
      setFormData(data);
      form.setFieldsValue({
        userName: data.userName || "",
        phone: data.phone || "",
        email: data.email || "",
        gender: data.gender || "male",
        mode: data.mode || "light",
      });

      setGender(data.gender || "male");
      setMode(data.mode || "light");
    }
  }, [data]);

  const handleChange = (changedValue: any,allValues:any) => {
    console.log("Changed:", changedValue);
    // console.log("All Values:", allValues);
    // setFormData(changedValue); // or update specific values
    if (changedValue.mode) {
      setMode(changedValue);
    }
    if (changedValue.gender) {
      setGender(changedValue);
    }
    setFormData((prev: any) => ({
      ...prev,
      ...changedValue,
    }));
    // form.setFieldsValue(allValues);
  };

  console.log(formData, "formData");

  return (
    <>
    {contextHolder}
    <CommonModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleCancel={() => setIsModalOpen(false)} width="45vw" title="User Profile">
      <Form form={form}  id="contractorForm" layout="vertical" onValuesChange={(changedValue,allValues) => handleChange(changedValue,allValues)}>
        <Row gutter={12}>
          {/* <Col span={6}>
            <Form.Item name="mode">
              <Segmented
                size="large"
                // shape="round"
                options={[
                  { value: "light", icon: <SunOutlined /> },
                  { value: "dark", icon: <MoonOutlined /> },
                ]}
                style={{width:"100%"}}
                className="segmentMode"
                // onChange={(value) => setMode(value)}
                value={formData?.mode}
                // value={mode}
              />
            </Form.Item>
          </Col> */}
          <Col span={24}>
            <CustomInput label="Name" name="userName"  />
          </Col>
          <Col span={24}>
            <CustomInput label="Phone" name="phone" />
          </Col>
          <Col span={24}>
            <CustomInput label="Email" name="email"  />
          </Col>
          <Col span={24}>
            <Form.Item name="gender">
              {/* <div className="segmentDiv"> */}
                <Segmented
                  options={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                  ]}
                  className="segment"
                  // onChange={(value) => setGender(value)}
                  value={formData?.gender}
                  style={{ width: "100%", marginTop: "10px" }}
                />
              {/* </div> */}
            </Form.Item>
          </Col>
          {/* <Form.Item label="Mode" name="mode">
          <div className="segmentDiv">
          <Segmented
            options={[
              { label: "Light", value: "light" },
              { label: "Dark", value: "dark" },
            ]}
            className="segment"
            // value={formData.mode}
            onChange={(value) => setMode(value)}
          />
          </div>
        </Form.Item> */}
          <Col span={24} style={{ alignItems: "right", justifyContent: "end" }}>
            <Button htmlType="submit" color="pink" variant="text" className="button" onClick={handleAddContact}>
              Add Contact
            </Button>
          </Col>

          <Button htmlType="submit" color="pink" variant="filled" className="button" onClick={handleUpdateProfile}>
            Update
          </Button>
        </Row>
      </Form>
      {openContactModal && <ContactModal open={openContactModal} setIsModalOpen={setOpenContactModal} width="44vw" title="Add Contact" onClose={handleContactModalClose} />}
    </CommonModal>
    </>
  );
};
