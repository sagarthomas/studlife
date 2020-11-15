import React, { useState } from "react";
import {
  DownOutlined,
  DashboardOutlined,
  DollarOutlined,
  EuroOutlined,
  TagsOutlined,
  HomeOutlined,
} from "@ant-design/icons";
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

  /*
  The following code is present to determine which page should be highlighted on refresh.
  (in case the browser is refreshed on a page that is not the home page)
  */
  let defaultPage = ["1"];
  let currentPath = window.location.href.split("/");
  currentPath = currentPath[currentPath.length - 1];
  if (currentPath === "") {
    defaultPage = ["1"];
  } else if (currentPath === "expenses") {
    defaultPage = ["2"];
  } else if (currentPath === "budgets") {
    defaultPage = ["3"];
  } else if (currentPath === "deals") {
    defaultPage = ["4"];
  } else if (currentPath === "housing") {
    defaultPage = ["5"];
  }

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
              : (item) => {
                  setCategories([...categories, item.category]);
                  setBudgets([...budgets, item]);
                }
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
                defaultSelectedKeys={defaultPage}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                  <NavLink to="/">Dashboard</NavLink>
                </Menu.Item>
                <Menu.Item key="2" icon={<DollarOutlined />}>
                  <NavLink to="/expenses">Expenses</NavLink>
                </Menu.Item>
                <Menu.Item key="3" icon={<EuroOutlined />}>
                  <NavLink to="/budgets">Budgets</NavLink>
                </Menu.Item>
                <Menu.Item key="4" icon={<TagsOutlined />}>
                  <NavLink to="/deals">Deals</NavLink>
                </Menu.Item>
                <Menu.Item key="5" icon={<HomeOutlined />}>
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
                <Route
                  path="/expenses"
                  exact
                  render={(props) => (
                    <ExpensePage
                      {...props}
                      categories={categories}
                      expenses={expenses}
                      setExpenses={setExpenses}
                      incomes={incomes}
                      setIncomes={setIncomes}
                    />
                  )}
                />
                <Route
                  path="/budgets"
                  exact
                  render={(props) => (
                    <BudgetPage
                      {...props}
                      budgets={budgets}
                      setBudgets={setBudgets}
                    />
                  )}
                />
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
