import React, { useContext, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import CreateAsset from "./CreateAsset";
import Login from "./Login";
import Register from "./Register";
import EditAsset from "./EditAsset";
import Accounts from "./Accounts";
import PrivateRoute from "./PrivateRoute";
import Context from "../context";
import reducer from "../reducer";

function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoggedIn } = state;
  return (
    <Router>
      <Context.Provider value={{ state, dispatch }}>
        <Header />
        <Switch>
          <PrivateRoute exact path="/create" component={CreateAsset} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/settings" component={Accounts} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/asset/edit/:id" component={EditAsset} />
        </Switch>
      </Context.Provider>
    </Router>
  );
}

export default App;
