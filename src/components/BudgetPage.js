import React from "react";
import { Space, Card, Divider, Table, Progress, Typography, Popover, Button, Input, Select } from 'antd';

class BudgetPage extends React.Component {
  constructor(props) {
    super(props);

    var budgets = [{category: "Food", budget: "200", spent: "50"}, {category: "School", budget: "1000", spent: "750"}];

    this.state = {budgets: budgets, currentEditCategory: budgets[0].category, currentEditBudget: budgets[0].budget, input: ""};

    this.updateBudget = this.updateBudget.bind(this);
    
  }

  findPercent() {
    var budget = 0;
    var spent = 0;

    this.state.budgets.forEach(element => {
      budget += parseFloat(element.budget);
      spent += parseFloat(element.spent);
    });

    return ((spent/budget)*100).toFixed(0);

  }

  findBudgetToEdit(value) {

    var currentEditBudget = "";

    this.state.budgets.forEach(element => {
      if (element.category == value) {
        currentEditBudget = element.budget;
      }
    });

    this.setState({ 
      currentEditCategory: value,
      currentEditBudget: currentEditBudget
    })
  }

  updateBudget() {
    
    var budgets = this.state.budgets;

    this.state.budgets.forEach(element => {
      if (element.category == this.state.currentEditCategory) {
        element.budget = this.state.input;
      }
    });

    this.setState({ 
      budgets: budgets
    })

    console.log(this.state.budgets);

  }

  setCurrentEdit(cat) {
    this.setState({ 
      currentEditCategory: cat
    })
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

    this.state.budgets.forEach(element => {
      editOptions.push({value: element.category, label: element.category});
    });

    const onChange = value => this.findBudgetToEdit(value);

    return (
      <Space direction="vertical">
        <Progress percent={this.findPercent()} type="circle" />
        <Title>CURRENT MONTH Budget</Title>
        <Divider />
        <Title level={2}>A breakdown of your budget</Title>
        <Table columns={columns} dataSource={this.state.budgets} />
        <Divider />
        <Title level={5}>Edit your budgets</Title>
        <Input.Group compact>
          <Select defaultValue={this.state.budgets[0].category} options={editOptions} onChange={onChange} >
          </Select>
          <Input style={{ width: '50%' }} onChange={(event) => this.setState({input: event.target.value})} suffix={
            <Button type="primary" onClick={this.updateBudget} >OK</Button>
          } />
        </Input.Group>
      </Space>
    );  
  }
}

export default BudgetPage;
