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

const DashboardPage = (props) => {
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
            {/* <Table columns={expenseColumns} dataSource={expenseData}></Table> */}
          </Card>
        </Col>
        <Col flex={2}>
          <Card title="Recent Income" style={{ height: "380px" }}>
            {/* <Table columns={incomeColumns} dataSource={incomeData}></Table> */}
          </Card>
        </Col>
      </Row>
      <Row style={{ padding: "10px" }}>
        <Col span={24}>
          <Card title="Latest Deals">
            {/* <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={dealsData}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    cover={
                      <img
                        alt="some"
                        width={150}
                        height={150}
                        src={item.imgSrc}
                      />
                    }
                    actions={[<StarOutlined key="favourite" />]}
                  >
                    <Meta title={item.deal} description={item.description} />
                  </Card>
                </List.Item>
              )}
            /> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
