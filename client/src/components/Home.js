import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Rating } from "semantic-ui-react";
import AssetList from "./AssetList";

function Home() {
  const [assets, setAssets] = useState([]);

  const handleRating = async (e, { rating }, id) => {
    try {
      const ratted = await axios.put("http://localhost:4000/api/asset/rating", {
        rating,
        id,
      });
      console.log(ratted);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAssets();
  }, []);
  async function getAssets() {
    try {
      const response = await axios.get("http://localhost:4000/api/assets/");
      console.log(response.data.foundAssets);
      setAssets(
        response.data.foundAssets.map((item) => (
          <Table.Row>
            <Table.Cell>
              <span style={{ fontSize: "2em" }}>
                <strong>{item.assetID}</strong>
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
    <div>
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
    </div>
  );
}

export default Home;
