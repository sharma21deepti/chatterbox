import { Button, Card, Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddContactMutation } from "../../../../redux/service/contactApiSlice";
import { PageRoutes } from "../../../../routes/config";
export const AddContact = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state?.auth?.userId);
  const [addContact, addContactInfo] = useAddContactMutation();
  const [phone, setPhone] = useState();
  const handleAddContact = () => {
    addContact({ phone: phone, senderId: userId });
  };
  useEffect(() => {
    if (addContactInfo?.isSuccess) {
      navigate(PageRoutes.Chats);
    }
  }, [addContactInfo?.isSuccess]);

  return (
    <div className="loginFormDiv">
      <Card className="addContactCard">
        <h1>
          <span>Oops !! </span>No Contact Added in your account
        </h1>
        <Form layout="horizontal">
          <Form.Item className="label" style={{ textAlign: "left" }}>
            Phone Number
          </Form.Item>
          <Input
            name="phone"
            className="input"
            type="number"
            onChange={(e: any) => setPhone(e?.target?.value)}
          />
          <Button
            htmlType="submit"
            color="pink"
            variant="filled"
            className="button"
            onClick={handleAddContact}
          >
            Add Contact
          </Button>
        </Form>
      </Card>
    </div>
  );
};
