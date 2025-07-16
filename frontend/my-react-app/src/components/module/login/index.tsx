import React, { useEffect, useState } from "react";
import "./style.css";
import { Button, Card, Col, Form, message, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../../../routes/config";
import { useLoginMutation } from "../../../redux/service/loginApiSlice";
import { useDispatch } from "react-redux";
import { setLoginState } from "../../../redux/slice/auth";
import { useLazyGetAllContactsListQuery } from "../../../redux/service/contactApiSlice";
import { CustomInput } from "../../common/input";
export const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  // ------------Api Integration ---------------
  const [loginApi, loginApiResponse] = useLoginMutation<any>();
  const [triggerGetContactsList, listAPiResponse] = useLazyGetAllContactsListQuery<any>();

  const handleLogin = () => {
     const { userName, password } = form.getFieldsValue();
    const payload = {
      userName,
      password,
    };
    loginApi(payload);
    console.log(payload,"payload");
    
  };

  const handleRegister = () => {
    navigate(PageRoutes.Register);
  };

  useEffect(() => {
    if (loginApiResponse?.isSuccess) {
      const payload: any = {
        userId: loginApiResponse?.data?.userData?._id,
        userName: loginApiResponse?.data?.userData?.userName,
      };

      dispatch(setLoginState(payload));
      // console.log(loginApiResponse?.data, "api");
      triggerGetContactsList({ id: loginApiResponse?.data?.userData?._id });
    }
  }, [loginApiResponse]);

  useEffect(() => {
    if (listAPiResponse?.isSuccess) {
      console.log(listAPiResponse?.data?.contacts, "api");

      if (listAPiResponse?.data?.contacts?.length > 0) {
        navigate(PageRoutes.Chats);
      } else {
        navigate(PageRoutes.AddContact);
      }
    }
  }, [listAPiResponse?.isSuccess]);

  useEffect(() => {
    if (loginApiResponse?.isError) {
      console.log(loginApiResponse?.error?.data?.message, "login");

      messageApi.open({
        type: "error",
        content: loginApiResponse?.error?.data?.message,
      });
    }
  }, [loginApiResponse?.isError]);

  return (
    <>
      {contextHolder}
      <div className="loginFormDiv">
        <div>
          <h4 className="startText">Login Chatterbox</h4>

          <Card className="loginCard"  hoverable>
            <Form form={form} onFinish={handleLogin} layout="vertical">
              <Row>
                {/* <Form.Item className="label">UserName</Form.Item> */}
                <CustomInput name="userName" label="UserName" className="input"  onChange={(e: any) => setName(e?.target?.value)} />
                {/* <Form.Item className="label">Password</Form.Item> */}
                <CustomInput name="password"  label="Password" className="input" onChange={(e: any) => setPassword(e?.target?.value)} />
              </Row>
              <Button htmlType="submit" color="pink" variant="filled" className="button">
                Login
              </Button>
            </Form>
            <div className="registerText">
              <span>Not a Registered User?</span>
              <span className="register" onClick={handleRegister}>
                Register
              </span>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
