import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import cookie from "js-cookie";
import Context from "../context";

const INITIAL_USER = {
  email: "",
  password: "",
};

function Login() {
  const [user, setUser] = useState(INITIAL_USER);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { state, dispatch } = useContext(Context);
  const history = useHistory();

  // useEffect(() => {
  //   const { isLoggedIn } = state;
  //   if (isLoggedIn) {
  //     history.push("/home");
  //   }
  // }, []);

  const catchErrors = (error, displayError) => {
    let errorMsg;
    if (error.response) {
      // The request was made and the server responsed with a status code that is not in the range of 2XX
      errorMsg = error.response.data;
      console.error("Error response", errorMsg);

      // For Cloudinary image uploads
      if (error.response.data.error) {
        errorMsg = error.response.data.error.message;
      }
    } else if (error.request) {
      // The request was made, but no response was received
      errorMsg = error.request;
      console.error("Error request", errorMsg);
    } else {
      // Something else happened in making the request that triggered an error
      errorMsg = error.message;
      console.error("Error message", errorMsg);
    }
    displayError(errorMsg);
  };

  const handleLogin = (token) => {
    dispatch({ type: "LOGIN_USER" });
    cookie.set("token", token);

    history.push("/");
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }

  async function HandleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = { ...user };
      const response = await axios.post(
        "http://localhost:4000/api/login",
        payload
      );
      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Message
        attached
        header="Welcome Back!"
        content="Log in with email and password"
        color="blue"
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={HandleSubmit}>
        <Message error header="Oops!" content={error} />
        <Segment>
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button
            // disabled={disabled || loading}
            icon="sign in"
            type="submit"
            color="orange"
            content="Login"
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        New user?{" "}
        <Link to="/register">
          <a>Sign up here</a>
        </Link>{" "}
        instead.
      </Message>
    </>
  );
}

export default Login;
