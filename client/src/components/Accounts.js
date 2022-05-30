import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Header, Checkbox, Table, Icon, Container } from "semantic-ui-react";
import cookie from "js-cookie";

function Accounts() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const url = `http://ec2-3-25-89-221.ap-southeast-2.compute.amazonaws.com:4000/api/users`;
    const token = cookie.get("token");
    const payload = { headers: { Authorization: token } };
    const response = await axios.get(url, payload);
    console.log(response.data.foundUsers);
    setUsers(response.data.foundUsers);
  }

  return (
    <Container>
      <div style={{ margin: "2em 0" }}>
        <Header as="h2">
          <Icon name="settings" />
          User Permissions
        </Header>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Joined</Table.HeaderCell>
              <Table.HeaderCell>Updated</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user) => (
              <UserPermission key={user._id} user={user} />
            ))}
          </Table.Body>
        </Table>
      </div>
    </Container>
  );
}

function UserPermission({ user }) {
  const [admin, setAdmin] = useState(user.role === "admin");
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    updatePermission();
  }, [admin]);

  function handleChangePermission() {
    setAdmin((prevState) => !prevState);
  }

  async function updatePermission() {
    const token = cookie.get("token");
    const url = `http://ec2-3-25-89-221.ap-southeast-2.compute.amazonaws.com:4000/api/users/role`;
    const payload = {
      _id: user._id,
      role: admin ? "admin" : "user",
    };
    await axios.put(url, payload, { headers: { Authorization: token } });
  }

  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox checked={admin} toggle onChange={handleChangePermission} />
      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>
        {new Date(user.createdAt).toLocaleDateString("en-AU")}
      </Table.Cell>
      <Table.Cell>
        {new Date(user.updatedAt).toLocaleDateString("en-AU")}
      </Table.Cell>
      <Table.Cell>{admin ? "admin" : "user"}</Table.Cell>
    </Table.Row>
  );
}

export default Accounts;
