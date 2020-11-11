import React from "react";
import { Space, Card, Divider, Table, Progress, Typography, Popover, Button, Input, Select, Popconfirm, InputNumber } from 'antd';

class BudgetPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {currentEdit: "", visible: false};

    this.setCurrentEdit = this.setCurrentEdit.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
    
  }

  findPercent() {

  }

  deleteBudget(b) {
    this.props.setBudgets(this.props.budgets.filter(element => element.category != b.category));
  }

  setCurrentEdit(c) {
    this.setState({ 
      currentEdit: c,
      visible: true 
    })
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

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  render() {

    const { Title } = Typography;

    


    return (
      <Space direction="vertical">
        <Progress percent={this.findPercent()} type="circle" />
        <Title>CURRENT MONTH Budget</Title>
        <Divider />
        {this.props.budgets.map((e) => <Card><h3>{e.category}</h3> <Progress percent={e.target} /> <h4>{e.target}/{e.target}</h4> <Divider />

        <Popover
          visible={this.state.visible}
          content={<Space><InputNumber formatter={(value) => `$ ${value}`} defaultValue={e.target} onChange={this.updateBudget} /> 
          <Button type="primary" onClick={this.hide} >OK</Button>
          </Space>}
            title="New spending target:"
            trigger="click"
          >
            <a onClick={() => this.setCurrentEdit(e.category)} >Edit</a>
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
