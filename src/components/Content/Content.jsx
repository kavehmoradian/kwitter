import "./content.css";
import React from "react";
import Parse from "parse";
import { Card, Col, Row } from "antd";
import RatingBtn from "../rating/btn/RatingBtn";
import { useEffect, useState } from "react";
import Count from "../rating/counter/Count";
import useTime from "../../hooks/useTime";

export default function Content({ id, dislikes, likes, title, content }) {
  const [likeArray, setLikeArray] = useState(likes);
  const [disLikeArray, setDisLikeArray] = useState(dislikes);
  const whatKind = () => {
    let temp = [...likeArray].filter(function (item) {
      return item === Parse.User.current().get("username");
    });
    let temp2 = [...disLikeArray].filter(function (item) {
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
  const [kind, setKind] = useState(whatKind());
  const like = () => {
    let post = new Parse.Object("Post");
    setLikeArray((prev) => [...prev, Parse.User.current().get("username")]);
    post.set("objectId", id);
    post.set("like", [...likeArray, Parse.User.current().get("username")]);
    try {
      post.save();
      setKind("liked");
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };
  const unLike = () => {
    let post = new Parse.Object("Post");
    likes = likeArray.filter(function (item) {
      return item !== Parse.User.current().get("username");
    });
    setLikeArray(likes);
    post.set("objectId", id);
    post.set("like", [...likes]);
    try {
      post.save();
      setKind(null);
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };
  const dislike = () => {
    setDisLikeArray((prev) => [...prev, Parse.User.current().get("username")]);
    let post = new Parse.Object("Post");
    post.set("objectId", id);
    post.set("dislike", [
      ...disLikeArray,
      Parse.User.current().get("username"),
    ]);
    try {
      post.save();
      setKind("disLiked");
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };
  const unDisLike = () => {
    let post = new Parse.Object("Post");
    dislikes = disLikeArray.filter(function (item) {
      return item !== Parse.User.current().get("username");
    });
    setDisLikeArray(dislikes);
    post.set("objectId", id);
    post.set("dislike", [...dislikes]);
    try {
      post.save();
      setKind(null);
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };
  const handleRating = (type) => {
    if (type === "like") {
      like();
    } else if (type === "disLike") {
      dislike();
    } else if (type === "unLike") {
      unLike();
    } else if (type === "unDisLike") {
      unDisLike();
    }
  };
  useEffect(() => {}, []);

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
          <RatingBtn handleRating={handleRating} rate={kind} />
          <Count likes={likeArray} dislikes={disLikeArray} />
        </Card>
      </Col>
    </Row>
  );
}
