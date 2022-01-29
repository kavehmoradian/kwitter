import "./count.css";
import React, { useState } from "react";
import { Modal, Button } from "antd";

export default function Count({ likes, dislikes }) {
  const [isLikeModalVisible, setIsLikeModalVisible] = useState(false);
  const [isDisLikeModalVisible, setIsDisLikeModalVisible] = useState(false);

  const showLikeModal = () => {
    setIsLikeModalVisible(true);
  };

  const cancelLikeModal = () => {
    setIsLikeModalVisible(false);
  };
  const showDisLikeModal = () => {
    setIsDisLikeModalVisible(true);
  };

  const cancelDisLikeModal = () => {
    setIsDisLikeModalVisible(false);
  };

  return (
    <>
      <p className="count">
        {likes.length} <a onClick={showLikeModal}>likes</a> and{" "}
        {dislikes.length} <a onClick={showDisLikeModal}>dislikes</a> {":)) "}
      </p>
      <Modal
        visible={isLikeModalVisible}
        title="Likes:"
        onCancel={cancelLikeModal}
        footer={[
          <Button key="back" onClick={cancelLikeModal}>
            Return
          </Button>,
        ]}
      >
        {likes && likes.map((username) => <p>{username}</p>)}
      </Modal>
      <Modal
        visible={isDisLikeModalVisible}
        title="dislikes:"
        onCancel={cancelDisLikeModal}
        footer={[
          <Button key="back" onClick={cancelDisLikeModal}>
            Return
          </Button>,
        ]}
      >
        {dislikes && dislikes.map((username) => <p>{username}</p>)}
      </Modal>
    </>
  );
}
