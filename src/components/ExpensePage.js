import React from "react";
import { Table, Tag, Space, Input, Button, Popconfirm, Form } from "antd";
import { Resizable } from "react-resizable";
import moment from "moment";
import "../App.css";

import EditModal from "./EditModal";
//Reference: https://stackoverflow.com/questions/59467345/how-can-i-update-and-delete-selected-rows-in-antd-table
// https://codesandbox.io/s/fkc2j?file=/index.js

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = (e) => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = (form) => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(
          <Input
            ref={(node) => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

var keyForItem = 0;

class ExpensePage extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: 200,
        sorter: (a, b) => a.category.length - b.category.length,
        filters: this.props.categories.map((val) => ({
          text: val,
          value: val,
        })),
        onFilter: (value, record) => record.category.indexOf(value) === 0,
      },
      {
        title: "Expense",
        dataIndex: "name",
        key: "name",
        width: 200,
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        width: 200,
        sorter: (a, b) => a.amount - b.amount,
      },
      {
        title: "Due date",
        dataIndex: "date",
        key: "date",
        width: 200,
        sorter: (a, b) => new Date(a.date) - new Date(b.date),
      },
      {
        title: "Frequency",
        dataIndex: "frequency",
        key: "frequency",
        width: 200,
        sorter: (a, b) => a.frequency.length - b.frequency.length,
        filters: [
          {
            text: "Daily",
            value: "daily",
          },
          {
            text: "Monthly",
            value: "monthly",
          },
          {
            text: "Bi-weekly",
            value: "bi-weekly",
          },
          {
            text: "Yearly",
            value: "yearly",
          },
          {
            text: "Once",
            value: "once",
          },
          {
            text: "Weekly",
            value: "weekly",
          },
        ],
        onFilter: (value, record) => record.frequency.indexOf(value) === 0,
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <div>
              <Popconfirm
                title="Are you sure to delete this expense"
                onConfirm={() => this.handleDelete(record.key)}
              >
                <a style={{ marginRight: 5 }}>Delete</a>
              </Popconfirm>
              <Popconfirm
                title="Are you sure to edit this expense?"
                onConfirm={() => {
                  this.setState(() => ({
                    recordToEdit: record,
                    editModalVisibility: true,
                    editType: "expense",
                  }));
                }}
              >
                <a>Edit</a>
              </Popconfirm>
            </div>
          ) : null,
      },
    ];

    this.incomeColumns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 200,
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        width: 200,
        sorter: (a, b) => a.amount - b.amount,
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        width: 200,
        sorter: (a, b) => new Date(a.date) - new Date(b.date),
      },
      {
        title: "Frequency",
        dataIndex: "frequency",
        key: "frequency",
        width: 200,
        sorter: (a, b) => a.frequency.length - b.frequency.length,
        filters: [
          {
            text: "Daily",
            value: "daily",
          },
          {
            text: "Monthly",
            value: "monthly",
          },
          {
            text: "Bi-weekly",
            value: "bi-weekly",
          },
          {
            text: "Yearly",
            value: "yearly",
          },
          {
            text: "Once",
            value: "once",
          },
          {
            text: "Weekly",
            value: "weekly",
          },
        ],
        onFilter: (value, record) => record.frequency.indexOf(value) === 0,
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource2.length >= 1 ? (
            <div>
              <Popconfirm
                title="Are you sure to delete this income"
                onConfirm={() => this.handleDeleteIncome(record.key)}
              >
                <a style={{ marginRight: 5 }}>Delete</a>
              </Popconfirm>
              <Popconfirm
                title="Are you sure to edit this income?"
                onConfirm={() => {
                  this.setState(() => ({
                    recordToEdit: record,
                    editModalVisibility: true,
                    editType: "income",
                  }));
                }}
              >
                <a>Edit</a>
              </Popconfirm>
            </div>
          ) : null,
      },
    ];

    this.state = {
      dataSource: this.props.expenses.map((val) => ({
        key: val.id,
        category: val.category,
        name: val.name,
        amount: val.amount,
        date: val.date.format("L"),
        frequency: val.frequency,
      })),
      dataSource2: this.props.incomes.map((val) => ({
        key: val.id,
        name: val.name,
        amount: val.amount,
        date: val.date.format("L"),
        frequency: val.frequency,
      })),
      count: 0,
      editModalVisibility: false,
      recordToEdit: undefined,
      editType: undefined,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.expenses !== prevProps.expenses) {
      this.setState(() => ({
        dataSource: this.props.expenses.map((val) => ({
          key: val.id,
          category: val.category,
          name: val.name,
          amount: val.amount,
          date: val.date.format("L"),
          frequency: val.frequency,
        })),
      }));
      this.setState({ count: this.state.count + 1 });
    }
    if (this.props.incomes !== prevProps.incomes) {
      this.setState(() => ({
        dataSource2: this.props.incomes.map((val) => ({
          key: val.id,
          name: val.name,
          amount: val.amount,
          date: val.date.format("L"),
          frequency: val.frequency,
        })),
      }));
    }
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.props.setExpenses(this.props.expenses.filter(e => e.id != key));
  };

  handleDeleteIncome = (key) => {
    const dataSource = [...this.state.dataSource2];
    this.props.setIncomes(this.props.incomes.filter(e => e.id != key));
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource, dataSource2 } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    console.log("in main exp", this.props.expenses);
    console.log("in main sta",this.state.dataSource);
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    const incomeColumns = this.incomeColumns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <EditModal
          visible={this.state.editModalVisibility}
          item={this.state.recordToEdit}
          type={this.state.editType}
          hide={() =>
            this.setState(() => ({
              editModalVisibility: false,
              editType: undefined,
              recordToEdit: undefined,
            }))
          }
          categories={this.props.categories}
          editExpense={(editedItem) =>
            this.props.setExpenses([
              ...this.props.expenses.filter((e) => e.id !== editedItem.id),
              editedItem,
            ])
          }
          editIncome={(editedItem) =>
            this.props.setIncomes([
              ...this.props.incomes.filter((e) => e.id !== editedItem.id),
              editedItem,
            ])
          }
        />
        <div>
          <h2>Expense Table</h2>
        </div>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        <div>
          <h2>Income Table</h2>
        </div>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource2}
          columns={incomeColumns}
        />
      </div>
    );
  }
}

export default ExpensePage;

// [
//   {
//     key: '1',
//     number: 1,
//     type: 'Food',
//     expense: 'Grocery',
//     amount: -50,
//     ddate: moment('10-15-2020').format('L'),
//     frequency: 'Bi-weekly'
//   },
//   {
//     key: '2',
//     number: 2,
//     type: 'Education',
//     expense: 'Textbooks',
//     amount: -300,
//     ddate: moment('10-28-2020').format('L'),
//     frequency: 'Once',
//   },
//   {
//     key: '3',
//     number: 3,
//     type: 'Income',
//     expense: 'Salary',
//     amount: 2000,
//     ddate: moment('10-21-2020').format('L'),
//     frequency: 'Once',
//   },
//   {
//     key: '4',
//     number: 4,
//     type: 'Miscellanous',
//     expense: 'Internet',
//     amount: -65,
//     ddate: moment('10-25-2020').format('L'),
//     frequency: 'Monthly',
//   },
// ],
