import React, { useState, useContext } from "react";
import {
  Button,
  Form,
  Icon,
  Message,
  Segment,
  Container,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import catchErrors from "../utils/catchErrors";
import cookie from "js-cookie";
import Context from "../context";

const INITIAL_USER = {
  name: "",
  email: "",
  password: "",
};

function Register() {
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { dispatch } = useContext(Context);

  const history = useHistory();
  const handleLogin = (token) => {
    dispatch({ type: "LOGIN_USER" });
    cookie.set("token", token);

    history.push("/");
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      const url = `http://localhost:4000/api/signup`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Message
        attached
        icon="settings"
        header="Get Started!"
        content="Create a new account"
        color="teal"
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error header="Oops!" content={error} />
        <Segment>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
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
          {/* <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Re-enter password"
            placeholder="Re-enter password"
            name="rpassword"
            type="password"
            value={user.password1}
            onChange={handleChange}
          /> */}
          <Button
            // disabled={disabled || loading}
            icon="signup"
            type="submit"
            color="orange"
            content="Register"
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Existing user?{" "}
        <Link to="/login">
          <a>Log in here</a>
        </Link>{" "}
        instead.
      </Message>
    </Container>
  );
}

export default Register;
