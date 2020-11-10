import React from "react";
import { Table, Tag, Space } from 'antd';
import { Resizable } from 'react-resizable';
import moment from 'moment';

const ResizableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={e => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

class ExpensePage extends React.Component {
  state = {
    columns: [
      {
        title: 'No.',
        dataIndex: 'number',
        key: 'number',
        width: 50,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        width: 200,
        sorter: (a, b) => a.type.length - b.type.length,
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
      },
      {
        title: 'Action',
        key: 'action',
        render: () => <a>Delete</a>,
      },
    ],
  };

  components = {
    header: {
      cell: ResizableTitle,
    },
  };

  date1 = new Date(2020, 12, 15, 0, 0, 0, 0)

  data = [
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
  ];

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    return <Table bordered components={this.components} columns={columns} dataSource={this.data} />;
  }
}

// class ExpensePage extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   ExpTable = () => {
//     const dataSource = [
      // {
      //   key: '1',
      //   number: 1,
      //   type: 'Food',
      //   expense: 'Grocery',
      //   amount: '$50',
      //   ddate: "Oct 15",
      //   frequency: 'Bi-weekly'
      // },
      // {
      //   key: '2',
      //   number: 2,
      //   type: 'Education',
      //   expense: 'Textbooks',
      //   amount: '$300',
      //   ddate: "Oct 28",
      //   frequency: 'Once',
      // },
//     ];
    
//     const columns = [
      // {
      //   title: 'No.',
      //   dataIndex: 'number',
      //   key: 'number',
      // },
      // {
      //   title: 'Type',
      //   dataIndex: 'type',
      //   key: 'type',
      // },
      // {
      //   title: 'Expense',
      //   dataIndex: 'expense',
      //   key: 'expense',
      // },
//       {
//         title: 'Amount',
//         dataIndex: 'amount',
//         key: 'amount',
//         sorter: {
//           compare: (a, b) => a.amount - b.amount,
//         },
//       },
//       {
//         title: 'Due Date',
//         dataIndex: 'ddate',
//         key: 'ddate',
//       },
      // {
      //   title: 'Frequency',
      //   dataIndex: 'frequency',
      //   key: 'frequency',
      // },
//     ];

//     function onChange(pagination, filters, sorter, extra) {
//       console.log('params', pagination, filters, sorter, extra);
//     }

//     return(<Table dataSource={dataSource} columns={columns} onChange={onChange}/>)
//   }

  

//   render() {
//     return (
//       <div>
//         <h1><b>EXPENSES</b></h1>
//         <this.ExpTable/>
//       </div>
//     );
//   }
// }

export default ExpensePage;
