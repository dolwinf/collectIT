import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Input, Menu, Image, Container, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import axios from "axios";
import cookie from "js-cookie";
import Context from "../context";

function Header() {
  const [activeItem, setActiveItem] = useState("home");
  const [search, setSearch] = useState("");

  const { state } = useContext(Context);
  const { isLoggedIn } = state;
  const { dispatch } = useContext(Context);
  const handleLogout = () => {
    cookie.remove("token");

    dispatch({ type: "LOGOUT_USER" });
    return <Redirect to="/login" />;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundAssetID = await axios.get(
      "http://localhost:4000/api/asset/search",
      search
    );
    console.log(foundAssetID);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };
  const handleItemClick = (name) => setActiveItem({ activeItem: name });

  return (
    <Menu color="blue" stackable fluid inverted size="large">
      <Link to="/">
        <Menu.Item
          header
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
        >
          <Image size="mini" src={logo} style={{ marginRight: "2em" }} />
          <strong>
            <i>CollectIT</i>
          </strong>
        </Menu.Item>
      </Link>

      {isLoggedIn && (
        <Container text>
          <Menu.Menu position="left">
            <Link to="/">
              <Menu.Item
                name="home"
                active={activeItem === "home"}
                onClick={handleItemClick}
              />
            </Link>
            <Link to="/create">
              <Menu.Item
                name="create"
                active={activeItem === "create"}
                onClick={handleItemClick}
              />
            </Link>
            <Link to="/account">
              <Menu.Item
                name="account"
                active={activeItem === "account"}
                onClick={handleItemClick}
              />
            </Link>
            <Link to="/settings">
              <Menu.Item
                name="settings"
                active={activeItem === "settings"}
                onClick={handleItemClick}
              />
            </Link>
          </Menu.Menu>
        </Container>
      )}

      {!isLoggedIn && (
        <Container text>
          <Menu.Menu position="right">
            <Link to="/login">
              <Menu.Item
                name="login"
                active={activeItem === "login"}
                onClick={handleItemClick}
              />
            </Link>
            <Link to="/register">
              <Menu.Item
                name="register"
                active={activeItem === "register"}
                onClick={handleItemClick}
              />
            </Link>
          </Menu.Menu>
        </Container>
      )}
      {isLoggedIn && (
        <Menu.Menu position="right">
          <Menu.Item>
            <Form onSubmit={handleSubmit}>
              {/* <Input
                icon="search"
                placeholder="Search Asset ID..."
                onChange={handleChange}
                value={search}
              /> */}
              <Form.Field
                control={Input}
                name="search"
                placeholder="search"
                value={search}
                onChange={handleChange}
              />
            </Form>
          </Menu.Item>
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={handleLogout}
          />
        </Menu.Menu>
      )}
    </Menu>
  );
}

export default Header;
