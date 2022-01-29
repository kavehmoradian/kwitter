import React from "react";
import { Button } from "antd";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import "./ratingBtn.css";

export default function RatingBtn({ rate, handleRating }) {
  return (
    <>
      {rate === null ? (
        <>
          <Button
            type="primary"
            danger
            className="button dislike"
            onClick={() => handleRating("disLike")}
          >
            <FrownOutlined />
          </Button>
          <Button
            type="primary"
            className="button like"
            onClick={() => handleRating("like")}
          >
            <SmileOutlined />
          </Button>
        </>
      ) : (
        <>
          {rate === "liked" ? (
            <Button
              type="primary"
              onClick={() => handleRating("unLike")}
              className="button liked"
            >
              <SmileOutlined />
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              className="button disliked"
              onClick={() => handleRating("unDisLike")}
            >
              <FrownOutlined />
            </Button>
          )}
        </>
      )}
    </>
  );
}
