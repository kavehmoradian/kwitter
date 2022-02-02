import "./inputForm.css";
import React from "react";
import Parse from "parse";
import { Form, Button, Input, Row, Col } from "antd";

export default function InputForm({ disPatch }) {
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const onFinish = (value) => {
    const Post = Parse.Object.extend("Post");
    const newPost = new Post();
    newPost.save({
      text: value.content,
      like: [],
      dislike: [],
      authorName: Parse.User.current().get("username"),
    });

    form.setFieldsValue({
      content: "",
    });
  };
  return (
    <Form name="input" onFinish={onFinish} autoComplete="off" form={form}>
      <Row justify="center" className="formInput">
        <Col justify="center" span={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Form.Item
            className="input"
            name="content"
            rules={[{ required: true, message: "this field is required :))" }]}
          >
            <TextArea
              placeholder="type somthing:))"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item className="submitButton">
            <Button type="primary" htmlType="submit">
              Post :))
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
