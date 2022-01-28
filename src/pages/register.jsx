import React from "react";
import { Row, Col } from "antd";
import Parse from "parse";
import { useHistory } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import { useAuth } from "../contexts/authContext";

export default function Register() {
  const history = useHistory();
  const { currentUser } = useAuth();
  if (!(currentUser === null)) {
    history.push("/");
  }

  const handleRegister = (values) => {
    const user = new Parse.User();
    user.set("username", values.username);
    user.set("password", values.password);

    user
      .signUp()
      .then((user) => {
        history.push("/login");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <Row justify="center">
        <Col justify="center" span={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <RegisterForm handleRegister={handleRegister} />
        </Col>
      </Row>
    </>
  );
}
