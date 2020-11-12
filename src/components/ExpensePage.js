import React from "react";
import { Table, Tag, Space, Input, Button, Popconfirm, Form } from 'antd';
import { Resizable } from 'react-resizable';
import moment from 'moment';
import "../App.css";

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

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
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
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
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

class ExpensePage extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'No.',
        dataIndex: 'number',
        key: 'number',
        width: 30,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        width: 200,
        sorter: (a, b) => a.type.length - b.type.length,
        filters: [
          props.categories.map(val => ({
            text: val,
            value: val,
          }),)
        ],
        onFilter: (value, record) => record.type.indexOf(value) === 0,
      },
      {
        title: 'Expense',
        dataIndex: 'expense',
        key: 'expense',
        width: 200,
        sorter: (a, b) => a.expense.length - b.expense.length,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        width: 200,
        sorter: (a, b) => a.amount - b.amount,
      },
      {
        title: 'Due date',
        dataIndex: 'ddate',
        key: "ddate",
        width: 200,
        sorter: (a, b) => new Date(a.ddate) - new Date(b.ddate)
      },
      {
        title: 'Frequency',
        dataIndex: 'frequency',
        key: 'frequency',
        width: 200,
        sorter: (a, b) => a.frequency.length - b.frequency.length
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <div>
              <Popconfirm title="Are you sure to delete this expense" onConfirm={() => this.handleDelete(record.key)}>
                <a style={{marginRight: 5}}>Delete</a>
              </Popconfirm>
              <Popconfirm title="Are you sure to edit this expense?" >
                <a>Edit</a>
              </Popconfirm>
            </div>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: '1',
          number: 1,
          type: 'Food',
          expense: 'Grocery',
          amount: 50,
          ddate: moment('10-15-2020').format('L'),
          frequency: 'Bi-weekly'
        },
        {
          key: '2',
          number: 2,
          type: 'Education',
          expense: 'Textbooks',
          amount: 300,
          ddate: moment('10-28-2020').format('L'),
          frequency: 'Once',
        },
        {
          key: '3',
          number: 3,
          type: 'Miscellanous',
          expense: 'Internet',
          amount: 65,
          ddate: moment('10-25-2020').format('L'),
          frequency: 'Monthly',
        },
      ],
      count: 3,
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count+1,
      number: count+1,
      type: `Miscellanous`,
      expense: `Cell-phone bill`,
      amount: 40,
      ddate: moment('10-22-2020').format('L'),
      frequency: 'Monthly'
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    console.log(this.categories);
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
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
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

// new

// const ResizableTitle = props => {
//   const { onResize, width, ...restProps } = props;

//   if (!width) {
//     return <th {...restProps} />;
//   }

//   return (
//     <Resizable
//       width={width}
//       height={0}
//       handle={
//         <span
//           className="react-resizable-handle"
//           onClick={e => {
//             e.stopPropagation();
//           }}
//         />
//       }
//       onResize={onResize}
//       draggableOpts={{ enableUserSelectHack: false }}
//     >
//       <th {...restProps} />
//     </Resizable>
//   );
// };

// class ExpensePage extends React.Component {
//   state = {
//     columns: [
      // {
      //   title: 'No.',
      //   dataIndex: 'number',
      //   key: 'number',
      //   width: 50,
      // },
      // {
      //   title: 'Type',
      //   dataIndex: 'type',
      //   key: 'type',
      //   width: 200,
      //   sorter: (a, b) => a.type.length - b.type.length,
      // },
      // {
      //   title: 'Expense',
      //   dataIndex: 'expense',
      //   key: 'expense',
      //   width: 200,
      //   sorter: (a, b) => a.expense.length - b.expense.length,
      // },
      // {
      //   title: 'Amount',
      //   dataIndex: 'amount',
      //   width: 200,
      //   sorter: (a, b) => a.amount - b.amount,
      // },
      // {
      //   title: 'Due date',
      //   dataIndex: 'ddate',
      //   key: "ddate",
      //   width: 200,
      //   sorter: (a, b) => new Date(a.ddate) - new Date(b.ddate)
      // },
      // {
      //   title: 'Frequency',
      //   dataIndex: 'frequency',
      //   key: 'frequency',
      //   width: 200,
      // },
//       {
//         title: 'Action',
//         key: 'action',
//         render: () => <a>Delete</a>,
//       },
//     ],
//     data: [
      // {
      //   key: '1',
      //   number: 1,
      //   type: 'Food',
      //   expense: 'Grocery',
      //   amount: 50,
      //   ddate: moment('10-15-2020').format('L'),
      //   frequency: 'Bi-weekly'
      // },
      // {
      //   key: '2',
      //   number: 2,
      //   type: 'Education',
      //   expense: 'Textbooks',
      //   amount: 300,
      //   ddate: moment('10-28-2020').format('L'),
      //   frequency: 'Once',
      // },
      // {
      //   key: '3',
      //   number: 3,
      //   type: 'Miscellanous',
      //   expense: 'Internet',
      //   amount: 65,
      //   ddate: moment('10-25-2020').format('L'),
      //   frequency: 'Monthly',
      // },
//     ]    
//   };

//   components = {
//     header: {
//       cell: ResizableTitle,
//     },
//   };

//   handleResize = index => (e, { size }) => {
//     this.setState(({ columns }) => {
//       const nextColumns = [...columns];
//       nextColumns[index] = {
//         ...nextColumns[index],
//         width: size.width,
//       };
//       return { columns: nextColumns };
//     });
//   };

//   render() {
//     const columns = this.state.columns.map((col, index) => ({
//       ...col,
//       onHeaderCell: column => ({
//         width: column.width,
//         onResize: this.handleResize(index),
//       }),
//     }));

//     return <Table bordered components={this.components} columns={columns} dataSource={this.state.data} />;
//   }
// }

export default ExpensePage;
