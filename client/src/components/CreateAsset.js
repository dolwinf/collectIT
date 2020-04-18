import React, { useState } from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon,
  Segment,
  Container,
  Grid,
} from "semantic-ui-react";
import axios from "axios";
import catchErrors from "../utils/catchErrors";

const INITIAL_ASSET = {
  name: "",
  model: "",
  brand: "",
  category: "",
  assignee: "",
  type: "",
  description: "",
  assetID: Number,
};

function CreateAsset() {
  const [asset, setAsset] = useState(INITIAL_ASSET);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setAsset((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      setDisabled(true);
      setLoading(true);
      const assetData = await axios.post(
        "http://localhost:4000/api/asset/create",

        asset
      );
      setAsset(INITIAL_ASSET);
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
        <Icon name="add" color="orange" />
        Create New Asset
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
          content="Asset has been created"
        />
        <Form.Group>
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="name"
            value={asset.name}
            onChange={handleChange}
            required
          />

          <Form.Field
            control={Input}
            name="model"
            label="Model"
            placeholder="model"
            value={asset.model}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="type"
            label="Type"
            placeholder="type"
            value={asset.type}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="assetID"
            label="AssetID"
            placeholder="assetID"
            value={asset.assetID}
            onChange={handleChange}
            required
          />
          <Form.Field
            control={Input}
            name="brand"
            label="Brand"
            placeholder="brand"
            value={asset.brand}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="category"
            label="Category"
            placeholder="category"
            value={asset.category}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="type"
            label="Type"
            placeholder="type"
            value={asset.type}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="assignee"
            label="Assignee"
            placeholder="assignee"
            value={asset.assignee}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          value={asset.description}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          content="Submit"
          type="submit"
        />
      </Form>
    </Container>
  );
}

export default CreateAsset;
