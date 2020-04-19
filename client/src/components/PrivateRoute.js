import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Context from "../context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(Context);

  const { isLoggedIn } = state;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
