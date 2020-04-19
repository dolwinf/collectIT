import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import CreateAsset from "./CreateAsset";
import Login from "./Login";
import Register from "./Register";

let isLoggedIn = false;

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        {isLoggedIn && (
          <div>
            <Route path="/create" component={CreateAsset} />
            <Route exact path="/" component={Home} />
            <Redirect exact from="/login" to="/" />
            <Redirect exact from="/register" to="/" />
          </div>
        )}
        <Redirect exact from="/create" to="/" />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
