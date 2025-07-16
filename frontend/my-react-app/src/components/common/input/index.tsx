import React from "react";
import "./style.css";
import { Form, Input } from "antd";

export const CustomInput = (props: any) => {
  const { value, name, label, onChange,type } = props;
  return (
    <>
     <Form.Item
      label={<span className="label-text">{label}</span>}
      name={name}
      className="form-item"
    >
      <Input className="custom-input" type={type} />
    </Form.Item>
    </>
  );
};
