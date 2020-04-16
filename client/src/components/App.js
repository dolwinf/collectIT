import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import CreateAsset from "./CreateAsset";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/create" component={CreateAsset} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
