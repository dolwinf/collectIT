import React, { useState } from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Message,
  Header,
  Icon,
  Container,
  Table,
  Rating,
} from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
import catchErrors from "../utils/catchErrors";
import cookie from "js-cookie";
import { awsurl } from '../utils/config'

const INITIAL_ASSET = {
  name: "",
  model: "",
  brand: "",
  category: "",
  assignee: "",
  type: "",
  description: "",
  assetID: "",
};
function SearchAsset() {
  const [assets, setAssets] = useState(INITIAL_ASSET);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    console.log({ [name]: value });
    setAssets((prevState) => ({ ...prevState, [name]: value }));
  }

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

  async function handleSubmit(e) {
    const token = cookie.get("token");
    console.log(token);
    try {
      e.preventDefault();

      setDisabled(true);
      setLoading(true);
      const assetData = await axios.post(
        `${awsurl}/api/search`,

        assets,
        {
          headers: { Authorization: `${token}` },
        }
      );
      setAssets(
        assetData.data.foundAssets.map((item) => (
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
      console.log(assetData);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
      setDisabled(false);
      setSuccess(true);
    }
  }
  return (
    <Container>
      <Header as="h2" block>
        <Icon name="search" color="orange" />
        Search Assets
      </Header>

      <Form
        loading={loading}
        error={Boolean(error)}
        success={success}
        onSubmit={handleSubmit}
      >
        <Message error header="Oops!" content={error} />
        <Message
          success
          icon="check"
          header="Success!"
          content="Assets found"
        />
        <Form.Group>
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="name"
            value={assets.name}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="model"
            label="Model"
            placeholder="model"
            value={assets.model}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="type"
            label="Type"
            placeholder="type"
            value={assets.type}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            control={Input}
            name="assetID"
            label="AssetID"
            placeholder="assetID"
            value={assets.assetID}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="category"
            label="Category"
            placeholder="category"
            value={assets.category}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="assignee"
            label="Assignee"
            placeholder="assignee"
            value={assets.assignee}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          value={assets.description}
          onChange={handleChange}
        />

        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          content="Search"
          type="submit"
        />
      </Form>

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

        <Table.Body>{assets.length ? assets : ""}</Table.Body>
      </Table>
    </Container>
  );
}

export default SearchAsset;
