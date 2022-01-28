import { useAuth } from "../../contexts/authContext";
import "./topBar.css";
import logo from "./logo.png";
import { Link, useHistory } from "react-router-dom";
import { Button, Row, Col } from "antd";
import Parse from "parse";

export default function TopBar() {
  const history = useHistory();
  const { currentUser, setUser } = useAuth();
  const doUserLogOut = async function () {
    try {
      await Parse.User.logOut();
      setUser(null);
      if (!currentUser) {
        history.push("/");
      }
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };
  return (
    <Row type="flex" align="middle" className="top">
      <Col span={5} className="topLeft">
        <span className="title">Kwitter</span>
      </Col>
      <Col span={14} className="topCenter">
        <ul className="topList">
          <Link to={"/"} className="topListItem">
            HOME
          </Link>
          <Link to={"/about"} className="topListItem">
            ABOUT
          </Link>
          {currentUser === null ? (
            <>
              <Link to={"/register"} className="topListItem">
                REGISTER
              </Link>
              <Link to={"/login"} className="topListItem">
                LOGIN
              </Link>
            </>
          ) : (
            <Link to={"#"} onClick={doUserLogOut} className="topListItem">
              LOGOUT
            </Link>
          )}
        </ul>
      </Col>
      <Col span={5} className="topRight">
        <img className="topImg" src={logo} alt="" />
      </Col>
    </Row>
  );
}
