import React from "react";
import {
  Row,
  Col,
  Layout,
  Menu,
  Card,
  Progress,
  Table,
  List,
  Drawer,
} from "antd";
import Meta from "antd/lib/card/Meta";

import lazeez from "./lazeez.jpg";
import fortinos from "./fortinos.jpg";
import cineplex from "./cineplex.png";
import subway from "./subway.jpg";
import foodbasics from "./foodbasics.jpg";
import osmows from "./osmows.png";

const DashboardPage = (props) => {
  const images = [lazeez, fortinos, cineplex, subway, foodbasics, osmows];
  const expenseColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <p>${amount} </p>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => date.format("L"),
    },
  ];
  const incomeColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <p>${amount} </p>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => date.format("L"),
    },
  ];

  return (
    <div>
      <Row style={{ padding: "10px" }}>
        <Col flex={1}>
          <Card title="Your score" style={{ height: "380px" }}>
            <Progress
              type="dashboard"
              percent={82}
              format={(percent) => `${percent}`}
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              width={190}
            />
            <p>
              <a>See details &gt;</a>
            </p>
          </Card>
        </Col>
        <Col flex={2}>
          <Card title=" Recent Expenses" style={{ height: "380px" }}>
            <Table columns={expenseColumns} dataSource={props.expenses}></Table>
          </Card>
        </Col>
        <Col flex={2}>
          <Card title="Recent Income" style={{ height: "380px" }}>
            <Table columns={incomeColumns} dataSource={props.incomes}></Table>
          </Card>
        </Col>
      </Row>
      <Row style={{ padding: "10px" }}>
        <Col span={24}>
          <Card title="Latest Deals">
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={props.deals}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    cover={
                      <img
                        alt="some"
                        width={150}
                        height={150}
                        src={images[item.dealID - 1]}
                      />
                    }
                  >
                    <Meta title={item.store} description={item.discount} />
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
