import React from "react";
import { Space, Card, Divider, Table, Progress, Typography, Popover, Button, Input, Select } from 'antd';

class BudgetPage extends React.Component {
  constructor(props) {
    super(props);

    this.updateBudget = this.updateBudget.bind(this);
    
  }

  findPercent() {

  }

  findBudgetToEdit(value) {

  }

  updateBudget() {
    

  }

  setCurrentEdit(cat) {
  }

  render() {

    const { Title } = Typography;


    const columns = [
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Your Budget ($)',
        dataIndex: 'budget',
        key: 'budget',
      },
      {
        title: 'Spent ($)',
        dataIndex: 'spent',
        key: 'spent',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: () =>
          <Progress percent="75" type="circle" width="50px" />
      },
    ];

    const editOptions = [];


    const onChange = value => this.findBudgetToEdit(value);

    console.log("Props: " + this.props.budgets);

    return (
      <Space direction="vertical">
        <Progress percent={this.findPercent()} type="circle" />
        <Title>CURRENT MONTH Budget</Title>
        <Divider />
        <Title level={2}>A breakdown of your budget</Title>
        <Table columns={columns} />
        <Divider />
      </Space>
    );  
  }
}

export default BudgetPage;
