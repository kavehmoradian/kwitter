import Parse from "parse";
import InputForm from "../components/input/InputForm";
import Content from "../components/Content/Content";
import { useAuth } from "../contexts/authContext";
import { Alert } from "antd";
import { useState, useEffect } from "react";

export default function Home() {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);

  const readPosts = async function () {
    const parseQuery = new Parse.Query("Post");
    parseQuery.descending("createdAt");
    try {
      let post = await parseQuery.find();
      setPosts(post);
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  const handleSubmitPost = (value) => {
    const Post = Parse.Object.extend("Post");
    const newPost = new Post();
    newPost.save({
      text: value.content,
      like: [],
      dislike: [],
      authorName: Parse.User.current().get("username"),
    });
    readPosts();
  };

  useEffect(() => {
    readPosts();
  }, []);

  return (
    <div className="App">
      {currentUser === null ? (
        <Alert
          message="wellcome to kwitter >__<"
          description="you must login fist:)"
          type="info"
          showIcon
        />
      ) : (
        <div className="">
          <InputForm submit={handleSubmitPost} />
          <div className="">
            {posts &&
              posts.map((user, index) => (
                <Content
                  key={user.id}
                  id={user.id}
                  title={user.get("authorName")}
                  content={user.get("text")}
                  likes={user.get("like")}
                  dislikes={user.get("dislike")}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
