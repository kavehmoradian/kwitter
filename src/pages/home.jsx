import Parse from "parse";
import InputForm from "../components/input/InputForm";
import Content from "../components/Content/Content";
import { useAuth } from "../contexts/authContext";
import { Alert } from "antd";
import { useEffect } from "react";
import { useReducer } from "react";
import PostReducer from "../reducers/postReducer";

export default function Home() {
  const { currentUser } = useAuth();
  const [state, disPatch] = useReducer(PostReducer, { posts: [] });

  const readPosts = async function () {
    const parseQuery = new Parse.Query("Post");
    parseQuery.descending("createdAt");
    parseQuery.find().then((post) => {
      disPatch({ type: "read_posts", payload: { posts: post } });
    });

    return true;
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
          <InputForm disPatch={disPatch} />
          <div className="">
            {state.posts &&
              state.posts.map((user, index) => (
                <Content
                  key={user.id}
                  id={user.id}
                  title={user.get("authorName")}
                  content={user.get("text")}
                  likes={user.get("like")}
                  dislikes={user.get("dislike")}
                  time={user.get("createdAt")}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
