import { Modal, Select } from 'antd'
import React from 'react'
import { Button, Form, Input, DatePicker } from "antd";


const AddIncome = ({open, onCancel, onFinish}) => {
  const [form] = Form.useForm();
  return (
    <Modal title={"Add Income"} open={open} onCancel={onCancel} footer={null}>
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish[(values, "expense")];
          form.resetFields();
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input the name of transation!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please enter amount" }]}
        >
          <Input placeholder="e.g. Grocery shopping" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Please select a tag" }]}
        >
          <Select
            placeholder="Select category"
            options={[
              { value: "food", label: "Food" },
              { value: "travel", label: "Travel" },
              { value: "shopping", label: "Shopping" },
              { value: "bills", label: "Bills" },
              { value: "other", label: "Other" },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddIncome