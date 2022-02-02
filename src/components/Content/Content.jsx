import "./content.css";
import React from "react";
import Parse from "parse";
import { Card, Col, Row } from "antd";
import RatingBtn from "../rating/btn/RatingBtn";
import Count from "../rating/counter/Count";
import useTime from "../../hooks/useTime";

export default function Content({ id, dislikes, likes, title, content, time }) {
  const whatKind = () => {
    let temp = [...likes].filter(function (item) {
      return item === Parse.User.current().get("username");
    });
    let temp2 = [...dislikes].filter(function (item) {
      return item === Parse.User.current().get("username");
    });
    if (temp.length > 0) {
      return "liked";
    } else if (temp2.length > 0) {
      return "disLiked";
    } else {
      return null;
    }
  };

  const handleRating = (type) => {
    if (type === "like") {
      let post = new Parse.Object("Post");
      post.set("objectId", id);
      post.set("like", [...likes, Parse.User.current().get("username")]);
      try {
        post.save();
        return true;
      } catch (error) {
        alert(`Error! ${error.message}`);
        return false;
      }
    } else if (type === "disLike") {
      let post = new Parse.Object("Post");
      post.set("objectId", id);
      post.set("dislike", [...dislikes, Parse.User.current().get("username")]);
      try {
        post.save();
        return true;
      } catch (error) {
        alert(`Error! ${error.message}`);
        return false;
      }
    } else if (type === "unLike") {
      let post = new Parse.Object("Post");
      let Likes = likes.filter(function (item) {
        return item !== Parse.User.current().get("username");
      });
      post.set("objectId", id);
      post.set("like", [...Likes]);
      try {
        post.save();
        return true;
      } catch (error) {
        alert(`Error! ${error.message}`);
        return false;
      }
    } else if (type === "unDisLike") {
      let post = new Parse.Object("Post");
      let Dislikes = dislikes.filter(function (item) {
        return item !== Parse.User.current().get("username");
      });
      post.set("objectId", id);
      post.set("dislike", [...Dislikes]);
      try {
        post.save();
        return true;
      } catch (error) {
        alert(`Error! ${error.message}`);
        return false;
      }
    }
  };

  return (
    <Row>
      <Col span={20} offset={2}>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={title}
          extra={<p>{useTime(time)}</p>}
        >
          {<pre className="content">{content}</pre>}
          <RatingBtn handleRating={handleRating} rate={whatKind()} />
          <Count likes={likes} dislikes={dislikes} />
        </Card>
      </Col>
    </Row>
  );
}
