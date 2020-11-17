import React from "react";
import { Space, Card, Divider, Table, Progress, Typography, Popover, Button, Input, Select, Popconfirm, InputNumber } from 'antd';
import moment from 'moment';

class BudgetPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {currentEdit: "", visible: false};

    this.setCurrentEdit = this.setCurrentEdit.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
    this.findPercent = this.findPercent.bind(this);
    this.getAmountSpent = this.getAmountSpent.bind(this);
    this.findVisibility = this.findVisibility.bind(this);
    
  }


  deleteBudget(b) {
    this.props.setBudgets(this.props.budgets.filter(element => element.category != b.category));
  }

  setCurrentEdit(c) {

    console.log(this.props.expenses);

    this.setState({ 
      currentEdit: c
    })

    var newVisible = this.props.visible;

    for (let i = 0; i < this.props.budgets.length; i++) {
      if (this.props.budgets[i].category == c) {
        newVisible[i] = true;
      }

      else {
        newVisible[i] = false;
      }
    }

    console.log(newVisible);

    this.props.setVisible(newVisible);
  }

  updateBudget(v) {
    
    var budgets = this.props.budgets;

    budgets.forEach(element => {
      if (element.category == this.state.currentEdit) {
        element.target = v;
      }
    });

    this.props.setBudgets(budgets);
    console.log(budgets);

  }

  findPercent(b) {
    var spent = this.getAmountSpent(b.category);
    var target = parseInt(b.target);
    console.log("Spent: " + this.getAmountSpent(b.category));
    return ((spent*100.0)/target).toFixed(0);
  }

  findTotalBudgetAndSpent() {

    var totalBudget = 0;
    var totalSpent = 0;

    this.props.budgets.forEach(element => {
      totalBudget += element.target;
      totalSpent += this.getAmountSpent(element.category);
    });

    totalBudget = parseInt(totalBudget);
    totalSpent = parseInt(totalSpent);

    return ([totalSpent, totalBudget]);

  }

  getTotalPercent() {

    var percent = 0;

    if (this.findTotalBudgetAndSpent() != [0,0] && this.findTotalBudgetAndSpent()[1] != 0) {
      percent = ((this.findTotalBudgetAndSpent()[0]*100.0))/(this.findTotalBudgetAndSpent()[1].toFixed(0));
    }

    return percent.toFixed(0);
  }

  getAmountSpent(c) {

    var now = moment().startOf("hour");

    var spent = 0;

    for (let index = 0; index < this.props.expenses.length; index++) {
      if (this.props.expenses[index].category == c) {
        var date = this.props.expenses[index].date;
        var duration = moment.duration(date.diff(now))
        
        if (duration.as("days") <= 1 && date.month() == now.month()) {
          spent += this.props.expenses[index].amount;
        }
      }      
    }

    return spent;
  }

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  findVisibility(c) {

    console.log("In find visibility");

    for (let i = 0; i < this.props.budgets.length; i++) {
      console.log(this.props.budgets[i].category, c);
      if (this.props.budgets[i].category == c) {
        console.log(this.props.visible[i], typeof this.props.visible[i]);
        return this.props.visible[i];
      }
    }

    console.log("Leaving find visibility");

  }

  render() {

    const { Title } = Typography;
    console.log(this.props.visible);

    return (
      <Space direction="vertical">
        <Progress percent={this.getTotalPercent()} type="circle" />
        <Title>{moment.months(moment().startOf("hour").month())} Budget</Title>
        <h3>${this.findTotalBudgetAndSpent()[0]}/${this.findTotalBudgetAndSpent()[1]}</h3>
        <Divider />
        {this.props.budgets.map((e) => <Card><h3>{e.category}</h3> <Progress percent={this.findPercent(e)} /> <h4>${this.getAmountSpent(e.category)}/${e.target}</h4> <Divider />

        <Popover
          visible={this.findVisibility(e.category)}
          content={<Space><InputNumber formatter={(value) => `$ ${value}`} defaultValue={e.target} onChange={this.updateBudget} /> 
          <Button type="primary" onClick={this.hide} >OK</Button>
          </Space>}
            title="New spending target:"
            trigger="click"
          >
            <a onClick={() => this.setCurrentEdit(e.category)} >Edit </a>
        </Popover> 

        <Popconfirm
          title="Delete budget?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => this.deleteBudget(e)}
        >
          <a>Delete</a>
        </Popconfirm> </Card>)}
      </Space>
    );  
  }
}

export default BudgetPage;
