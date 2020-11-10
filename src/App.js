import React, { useState } from "react";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import { Button, Layout, Menu, Dropdown } from "antd";

import DashboardPage from "./components/DashboardPage";
import ExpensePage from "./components/ExpensePage";
import BudgetPage from "./components/BudgetPage";
import DealsPage from "./components/DealsPage";
import HousingPage from "./components/HousingPage";

import "./App.css";
import CreateModal from "./components/CreateModal";

const { Header, Content, Sider } = Layout;

const defaultExpenses = [];
const defaltIncomes = [];
const defaultBudgets = [];
const defaultCategories = ["Food", "Entertainment", "Grocery"];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [modalVisible, setModalVisibility] = useState(false);
  const [createType, setCreateType] = useState("expense");
  const [expenses, setExpenses] = useState(defaultExpenses);
  const [incomes, setIncomes] = useState(defaltIncomes);
  const [budgets, setBudgets] = useState(defaultBudgets);
  const [categories, setCategories] = useState(defaultCategories); // Used for budget and expense categories

  const createMenu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          setCreateType("expense");
          setModalVisibility(true);
        }}
      >
        New Expense
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          setCreateType("income");
          setModalVisibility(true);
        }}
      >
        New Income
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          setCreateType("budget");
          setModalVisibility(true);
        }}
      >
        New Budget
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <CreateModal
          visible={modalVisible}
          type={createType}
          onCancel={() => setModalVisibility(false)}
          categories={categories}
          addItem={
            createType === "expense"
              ? (item) => setExpenses([...expenses, item])
              : createType === "income"
              ? (item) => setIncomes([...incomes, item])
              : (item) => setBudgets([...budgets, item])
          }
        />
        <Router>
          <Header className="site-layout-background">
            <Dropdown overlay={createMenu}>
              <Button>
                Create <DownOutlined />
              </Button>
            </Dropdown>
          </Header>
          <Layout>
            <Sider
              width={200}
              collapsible
              collapsed={collapsed}
              onCollapse={(collapsed) => setCollapsed(collapsed)}
            >
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="1">
                  <NavLink to="/">Dashboard</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                  <NavLink to="/expenses">Expenses</NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                  <NavLink to="/budgets">Budgets</NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                  <NavLink to="/deals">Deals</NavLink>
                </Menu.Item>
                <Menu.Item key="5">
                  <NavLink to="/housing">Housing</NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: "24px" }}>
              <Content
                className="site-layout-background"
                style={{ padding: 24, margin: 0, minHeight: 280 }}
              >
                <Route exact path="/" component={DashboardPage} />
                <Route path="/expenses" component={ExpensePage} />
                <Route path="/budgets" exact render={(props) => <BudgetPage {...props}
                budgets={budgets} />} />
                <Route path="/deals" component={DealsPage} />
                <Route path="/housing" component={HousingPage} />
              </Content>
            </Layout>
          </Layout>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
