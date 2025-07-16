import { Button, Card, ConfigProvider, Form, Input, Row, Segmented, Slider } from "antd";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/service/loginApiSlice";
import { CustomInput } from "../../common/input";
export const Register = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("male");
  const initialData = {
    userName: "",
    password: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
  };
  const [formData, setFormData] = useState(initialData);

  // ------------API Integration -----------------

  const [userRegister, userRegisterResponse] = useRegisterMutation();

  const handleRegister = () => {
    const payload = {
      userName: formData?.userName,
      email: formData?.userName,
      phone: formData?.phone,
      password: formData?.password,
      gender: formData?.gender,
      age: formData?.age,
    };
    userRegister(payload);
  };

  const handleFormDataChange = (changedValue: any) => {
    console.log(changedValue, "changedValue");
    setFormData((prev: any) => {
      return {
        ...prev,
        ...changedValue,
      };
    });
  };
  useEffect(() => {
    if (userRegisterResponse?.isSuccess) {
      navigate("/");
    }
  }, [userRegisterResponse?.isSuccess]);
  return (
    <>
      <div className="loginFormDiv">
        <div>
          <h4 className="startText">Register at Chatterbox</h4>

          <Card className="registerCard" hoverable>
            <Form onFinish={handleRegister} initialValues={initialData} onChange={handleFormDataChange} layout="vertical">
              <Row>
                <CustomInput name="userName" className="input" label="User Name" />

                <CustomInput name="password" className="input" label="Password" type="password" />

                <CustomInput name="email" className="input" label="Email" type="email" />

                <CustomInput name="phone" className="input" label="Phone Number" type="phone" />
                <div style={{width:"100%"}}>
                <Form.Item className="label">Gender</Form.Item>
                <Segmented
                  options={[
                    {
                      label: "Male",
                      value: "male",
                      // , icon: <BarsOutlined />
                    },
                    {
                      label: "Female",
                      value: "female",
                      //   icon: <AppstoreOutlined />,
                    },
                  ]}
                  className="segmentRegister"
                  defaultValue={gender}
                  onChange={(e: any) => setGender(e?.target?.value)}
                />
                </div>
                <Form.Item className="label">Age</Form.Item>
                <ConfigProvider
                  theme={{
                    components: {
                      Slider: {
                        trackBg: "rgb(248, 104, 128)", // green active track
                        trackHoverBg: "rgb(248, 104, 128)", // hover color
                        handleColor: "rgb(248, 104, 128)",
                        handleActiveColor: "rgb(248, 104, 128)",
                      },
                    },
                  }}
                >
                  <Slider
                    defaultValue={18}
                    // tooltip={{ open: true }}
                    className="slider"
                  />
                </ConfigProvider>
              </Row>
              <Button htmlType="submit" color="pink" variant="filled" className="button" onClick={handleRegister}>
                Register
              </Button>
            </Form>
            
          </Card>
        </div>
      </div>
    </>
  );
};
