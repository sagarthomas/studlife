import React from "react";
import { Space, Card, Divider, Table, Progress, Typography, Popover, Button } from 'antd';

class BudgetPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {budgets: [{category: "Food", budget: "200", spent: "50"}, {category: "School", budget: "1000", spent: "750"}]};
  }

  findPercent() {
    var budget = 0;
    var spent = 0;

    this.state.budgets.forEach(element => {
      budget += parseFloat(element.budget);
      spent += parseFloat(element.spent);
    });

    return ((spent/budget)*100).toFixed(1);

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
    ];


    return (
      <Space direction="vertical">
        <Progress percent={this.findPercent()} type="circle" />
        <Title>CURRENT MONTH Budget</Title>
        <Divider />
        <Title level={2}>A breakdown of your budget</Title>
        <Table columns={columns} dataSource={this.state.budgets} />
      </Space>
    );  
  }
}

export default BudgetPage;
