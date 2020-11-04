import React, { useState } from "react";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import { Layout, Menu } from "antd";

import DashboardPage from "./components/DashboardPage";
import ExpensePage from "./components/ExpensePage";
import BudgetPage from "./components/BudgetPage";
import DealsPage from "./components/DealsPage";
import HousingPage from "./components/HousingPage";

import "./App.css";

const { Header, Content, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Router>
          <Header className="site-layout-background"></Header>
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
                <Route path="/budgets" component={BudgetPage} />
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
