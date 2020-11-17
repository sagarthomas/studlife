import { Modal, Form, Input, InputNumber, Select, DatePicker } from "antd";
import React, { useEffect } from "react";
import moment from "moment";

const { Option } = Select;

const EditModal = (props) => {
  const [expenseForm] = Form.useForm();
  const [incomeForm] = Form.useForm();

  useEffect(() => {
    if (props.type === "expense") {
      expenseForm.setFieldsValue({
        name: props.item.name,
        amount: props.item.amount,
        category: props.item.category,
        date: moment(props.item.ddate),
        frequency: props.item.frequency,
      });
    }
    if (props.type === "income") {
      incomeForm.setFieldsValue({
        name: props.item.name,
        amount: props.item.amount,
        date: moment(props.item.ddate),
        frequency: props.item.frequency,
      });
    }
  }, [props]);

  return (
    <Modal
      visible={props.visible}
      title={`Edit ${props.type}`}
      okText="Edit"
      cancelText="Cancel"
      onCancel={props.hide}
      onOk={() => {
        switch (props.type) {
          case "expense":
            expenseForm
              .validateFields()
              .then((values) => {
                expenseForm.resetFields();

                props.editExpense({ ...values, id: props.item.key });
                props.hide();
              })
              .catch((err) => console.log(err));
            break;

          case "income":
            incomeForm
              .validateFields()
              .then((values) => {
                incomeForm.resetFields();

                props.editIncome({ ...values, id: props.item.key });
                props.hide();
              })
              .catch((err) => console.log(err));
            break;
          default:
            break;
        }
      }}
    >
      {props.type === "expense" && (
        <Form form={expenseForm} layout="vertical" name="create_form">
          {console.log("Expense FORM")}
          {console.log(props.item)}
          <Form.Item
            name="name"
            label="Name"
            initialValue={props.item.expense}
            rules={[
              {
                required: true,
                message: "Please input a name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            initialValue={props.item.amount}
            rules={[{ required: true, message: "Please enter an amount!" }]}
          >
            <InputNumber
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            initialValue={props.item.type}
            rules={[
              {
                required: true,
                message: "Please select an expense category!",
              },
            ]}
          >
            <Select placeholder="Select a expense category" allowClear>
              {props.categories.map((c) => (
                <Option key={c} value={c}>
                  {c}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            initialValue={moment(props.item.ddate)}
            rules={[{ required: true, message: "Please enter the frequency!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="frequency"
            label="Frequency"
            initialValue={props.item.frequency}
            rules={[{ required: true, message: "Please enter the frequency!" }]}
          >
            <Select placeholder="Select a frequency" allowClear>
              <Option value="once">Once</Option>
              <Option value="daily">Daily</Option>
              <Option value="weekly">Weekly</Option>
              <Option value="bi-weekly">Bi-Weekly</Option>
              <Option value="monthly">Monthly</Option>
            </Select>
          </Form.Item>
        </Form>
      )}

      {props.type === "income" && (
        <Form form={incomeForm} layout="vertical" name="create_form">
          {console.log("Income FORM")}
          {console.log(props.item)}
          <Form.Item
            name="name"
            label="Name"
            initialValue={props.item.name}
            rules={[
              {
                required: true,
                message: "Please input a name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            initialValue={props.item.amount}
            rules={[{ required: true, message: "Please enter an amount!" }]}
          >
            <InputNumber
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            initialValue={moment(props.item.ddate)}
            rules={[{ required: true, message: "Please input a date" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="frequency"
            label="Frequency"
            initialValue={props.item.frequency}
            rules={[{ required: true, message: "Please select a frequency!" }]}
          >
            <Select placeholder="Select a frequency" allowClear>
              <Option value="once">Once</Option>
              <Option value="daily">Daily</Option>
              <Option value="weekly">Weekly</Option>
              <Option value="bi-weekly">Bi-Weekly</Option>
              <Option value="monthly">Monthly</Option>
            </Select>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditModal;
