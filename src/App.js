import "./App.css";
import { useEffect } from "react";
import Parse from "parse";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Login from "./pages/login";
import Register from "./pages/register";
import { useAuth } from "./contexts/authContext";
import TopBar from "./components/topbar/TopBar";

function App() {
  const { setUser } = useAuth();
  useEffect(() => {
    async function checkUser() {
      const CurrentUser = await Parse.User.currentAsync();
      setUser(CurrentUser);
      //console.log(CurrentUser ? CurrentUser.getUsername() : null);
    }
    checkUser();
  }, []);
  return (
    <BrowserRouter>
      <TopBar />
      <Switch>
        <Route exact path={"/"}>
          <Home />
        </Route>
        <Route path={"/login"}>
          <Login />
        </Route>
        <Route path={"/register"}>
          <Register />
        </Route>
        <Route path={"/about"} component={About} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
