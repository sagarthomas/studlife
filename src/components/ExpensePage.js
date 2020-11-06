import React from "react";
import { Table, Tag, Space } from 'antd';

class ExpensePage extends React.Component {
  constructor(props) {
    super(props);
  }

  ExpTable = () => {
    const dataSource = [
      {
        key: '1',
        number: 1,
        type: 'Food',
        expense: 'Grocery',
        amount: '$50',
        ddate: "Oct 15",
        frequency: 'Bi-weekly'
      },
      {
        key: '2',
        number: 2,
        type: 'Education',
        expense: 'Textbooks',
        amount: '$300',
        ddate: "Oct 28",
        frequency: 'Once',
      },
    ];
    
    const columns = [
      {
        title: 'No.',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Expense',
        dataIndex: 'expense',
        key: 'expense',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Due Date',
        dataIndex: 'ddate',
        key: 'ddate',
      },
      {
        title: 'Frequency',
        dataIndex: 'frequency',
        key: 'frequency',
      },
    ];

    return(<Table dataSource={dataSource} columns={columns} />)
  }

  render() {
    return (
      <div>
        <h1><b>EXPENSES</b></h1>
        <this.ExpTable/>
      </div>
    );
  }
}

export default ExpensePage;
