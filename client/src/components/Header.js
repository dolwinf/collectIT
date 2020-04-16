import React, { useState } from "react";
import { Input, Menu, Image, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

function Header() {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (name) => setActiveItem({ activeItem: name });

  return (
    <Menu
      color="blue"
      stackable
      fluid
      inverted
      position="center"
      size="large"
      id="menu-text"
    >
      <Link to="/">
        <Menu.Item
          header
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
        >
          <Image size="mini" src={logo} style={{ marginRight: "1em" }} />
          <strong>
            <i>CollectIT</i>
          </strong>
        </Menu.Item>
      </Link>
      <Container text>
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
      </Container>
      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Search Asset ID..." />
        </Menu.Item>
        <Menu.Item
          name="logout"
          active={activeItem === "logout"}
          onClick={handleItemClick}
        />
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
