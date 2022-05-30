import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table, Rating, Container } from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";
import Context from "../context";
import { awsurl } from '../utils/config'

function Home() {
  const [assets, setAssets] = useState([]);
  const { state } = useContext(Context);
  const { isLoggedIn } = state;
  const history = useHistory();

  const handleRating = async (e, { rating }, id) => {
    try {
      const ratted = await axios.put(`${awsurl}/api/asset/rating`, {
        rating,
        id,
      });
      console.log(ratted);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsLoggedIn = () => {
    if (isLoggedIn) {
      history.push("/");
    }
  };
  useEffect(() => {
    checkIsLoggedIn();
    getAssets();
  }, []);
  async function getAssets() {
    try {
      const response = await axios.get(`${awsurl}/api/assets/`);
      console.log(response.data.foundAssets);
      setAssets(
        response.data.foundAssets.map((item) => (
          <Table.Row>
            <Table.Cell>
              <span style={{ fontSize: "2em" }}>
                <strong>
                  <Link to={`/asset/edit/${item._id}`}>{item.assetID}</Link>
                </strong>
              </span>
            </Table.Cell>
            <Table.Cell singleLine>{item.name}</Table.Cell>
            <Table.Cell>
              <Rating
                icon="star"
                defaultRating={item.rating}
                maxRating={5}
                onRate={(e, { rating }) =>
                  handleRating(e, { rating }, item._id)
                }
              />
            </Table.Cell>
            <Table.Cell>{item.model}</Table.Cell>
            <Table.Cell>{item.assignee}</Table.Cell>
            <Table.Cell>{item.category}</Table.Cell>
            <Table.Cell>{item.description}</Table.Cell>
            <Table.Cell>{item.type}</Table.Cell>
          </Table.Row>
        ))
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>AssetID</Table.HeaderCell>
            <Table.HeaderCell singleLine>Name</Table.HeaderCell>
            <Table.HeaderCell singleLine>Asset Health</Table.HeaderCell>
            <Table.HeaderCell singleLine>Model</Table.HeaderCell>
            <Table.HeaderCell singleLine>Assignee</Table.HeaderCell>
            <Table.HeaderCell singleLine>Category</Table.HeaderCell>
            <Table.HeaderCell singleLine>Description</Table.HeaderCell>
            <Table.HeaderCell singleLine>Type</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{assets}</Table.Body>
      </Table>
    </Container>
  );
}

export default Home;
