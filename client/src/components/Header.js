import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Input, Menu, Image, Container, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import axios from "axios";
import cookie from "js-cookie";
import Context from "../context";

function Header() {
  const [activeItem, setActiveItem] = useState("home");
  const [assetID, setAssetID] = useState("");

  const { state } = useContext(Context);
  const { isLoggedIn } = state;
  const { dispatch } = useContext(Context);
  const history = useHistory();
  const handleLogout = () => {
    cookie.remove("token");

    dispatch({ type: "LOGOUT_USER" });
    history.push("/login");
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setAssetID(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const returnedAsset = await axios.post(
        "http://localhost:4000/api/asset/track",

        { assetID }
      );
      console.log(returnedAsset.data.foundAsset[0]._id);
      history.push(`/asset/edit/${returnedAsset.data.foundAsset[0]._id}`);
    } catch (e) {
      console.log(e);
    }
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
            <Link to="/search">
              <Menu.Item
                name="search"
                active={activeItem === "search"}
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
        <Form onSubmit={handleSubmit}>
          <Menu.Menu position="right">
            <Menu.Item>
              <input
                placeholder="Search Asset ID..."
                onChange={handleInputChange}
                value={assetID}
              />
            </Menu.Item>
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={handleLogout}
            />
          </Menu.Menu>
        </Form>
      )}
    </Menu>
  );
}

export default Header;
