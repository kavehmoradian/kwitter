import Parse from "parse";
import "./home.css";
import { useParseQuery } from "@parse/react";
import InputForm from "../components/input/InputForm";
import Content from "../components/Content/Content";
import { useAuth } from "../contexts/authContext";
import { Alert } from "antd";

export default function Home() {
  const { currentUser } = useAuth();

  const parseQuery = new Parse.Query("Post");
  parseQuery.descending("createdAt");

  const { results } = useParseQuery(parseQuery);

  const handleSubmitPost = (value) => {
    const Post = Parse.Object.extend("Post");
    const newPost = new Post();
    newPost.save({
      text: value.content,
      authorName: Parse.User.current().get("username"),
    });
  };

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
            {results &&
              results.map((user, index) => (
                <Content
                  key={index}
                  title={user.get("authorName")}
                  content={user.get("text")}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
