import "./content.css";
import React from "react";
import { Card, Col, Row } from "antd";

export default function Content({ title, content }) {
  return (
    <Row>
      <Col span={20} offset={2}>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={title}
          extra={<a href="#">More</a>}
        >
          {<pre className="content">{content}</pre>}
        </Card>
      </Col>
    </Row>
  );
}
