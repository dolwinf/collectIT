import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import CreateAsset from "./CreateAsset";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact to="/create" component={CreateAsset} />
        <Route exact to="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
