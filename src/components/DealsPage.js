import React from "react";
import {Card, Divider, Image, Row, Col} from "antd";
import lazeez from './lazeez.png';
import fortinos from './fortinos.jpg';
import cineplex from './cineplex.png';
import subway from './subway.png';
import foodbasics from './foodbasics.png';
import osmows from './osmows.png';

class DealsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    var images = [lazeez, fortinos, cineplex, subway, foodbasics, osmows];

    return (
      <Row>
        {this.props.deals.map(e => <Col key={parseInt(e.dealID)} span={8}>
        <Card>
          <Image width="40%" src={images[parseInt(e.dealID - 1)]} />
          <Divider />
          <h2>{e.store}</h2>
          <h3>{e.discount}</h3>
          <h3>{e.distance} km</h3>
        </Card>
        </Col>)}
      </Row>

    );
  }
}

export default DealsPage;
