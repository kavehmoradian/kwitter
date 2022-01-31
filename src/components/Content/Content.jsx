import "./content.css";
import React from "react";
import Parse from "parse";
import { Card, Col, Row } from "antd";
import RatingBtn from "../rating/btn/RatingBtn";
import { useReducer } from "react";
import Count from "../rating/counter/Count";
import useTime from "../../hooks/useTime";
import RatingReducer from "../../reducers/ratingReducer";

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
  const [state, disPatch] = useReducer(RatingReducer, {
    likes: likes,
    dislikes: dislikes,
    kind: whatKind(),
  });

  const handleRating = (type) => {
    if (type === "like") {
      let post = new Parse.Object("Post");
      post.set("objectId", id);
      post.set("like", [...state.likes, Parse.User.current().get("username")]);
      try {
        post.save();
        disPatch({
          type: "like",
          payload: {
            user: Parse.User.current().get("username"),
            kind: "liked",
          },
        });
        return true;
      } catch (error) {
        alert(`Error! ${error.message}`);
        return false;
      }
    } else if (type === "disLike") {
      let post = new Parse.Object("Post");
      post.set("objectId", id);
      post.set("dislike", [
        ...state.dislikes,
        Parse.User.current().get("username"),
      ]);
      try {
        post.save();
        disPatch({
          type: "disLike",
          payload: {
            user: Parse.User.current().get("username"),
            kind: "disLiked",
          },
        });
        return true;
      } catch (error) {
        alert(`Error! ${error.message}`);
        return false;
      }
    } else if (type === "unLike") {
      let post = new Parse.Object("Post");
      let likes = state.likes.filter(function (item) {
        return item !== Parse.User.current().get("username");
      });
      post.set("objectId", id);
      post.set("like", [...likes]);
      try {
        post.save();
        disPatch({
          type: "unLike",
          payload: { likes: likes, kind: null },
        });
        return true;
      } catch (error) {
        alert(`Error! ${error.message}`);
        return false;
      }
    } else if (type === "unDisLike") {
      let post = new Parse.Object("Post");
      let dislikes = state.dislikes.filter(function (item) {
        return item !== Parse.User.current().get("username");
      });
      post.set("objectId", id);
      post.set("dislike", [...dislikes]);
      try {
        post.save();
        disPatch({
          type: "unDisLike",
          payload: { dislikes: dislikes, kind: null },
        });
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
          <RatingBtn handleRating={handleRating} rate={state.kind} />
          <Count likes={state.likes} dislikes={state.dislikes} />
        </Card>
      </Col>
    </Row>
  );
}
