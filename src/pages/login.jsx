import React from "react";
import { Row, Col } from "antd";
import Parse from "parse";
import { useHistory } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../contexts/authContext";

export default function Login() {
  const history = useHistory();

  const { currentUser, setUser } = useAuth();
  if (!(currentUser === null)) {
    history.push("/");
  }

  const handleLogin = (values) => {
    const user = new Parse.User();
    user.set("username", values.username);
    user.set("password", values.password);
    user
      .logIn()
      .then((user) => {
        setUser(Parse.User.current());
        history.push("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <Row justify="center">
        <Col justify="center" span={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <LoginForm handleLogin={handleLogin} />
        </Col>
      </Row>
    </>
  );
}
