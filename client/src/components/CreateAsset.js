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

const INITIAL_ASSET = {
  name: "",
  model: "",
  brand: "",
  category: "",
  assignee: "",
  type: "",
  assetID: null,
};

function CreateAsset() {
  const [asset, setAsset] = useState(INITIAL_ASSET);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setAsset((prevState) => ({ ...prevState, [name]: value }));
  }
  return (
    <Container>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Asset
      </Header>

      <Form loading={loading} error={Boolean(error)} success={success}>
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
            value={INITIAL_ASSET.name}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="model"
            label="Model"
            placeholder="model"
            value={INITIAL_ASSET.model}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="type"
            label="Type"
            placeholder="type"
            value={INITIAL_ASSET.type}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="assetID"
            label="AssetID"
            placeholder="assetID"
            value={INITIAL_ASSET.assetID}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="brand"
            label="Brand"
            placeholder="brand"
            value={INITIAL_ASSET.brand}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="category"
            label="Category"
            placeholder="category"
            value={INITIAL_ASSET.category}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="type"
            label="Type"
            placeholder="type"
            value={INITIAL_ASSET.type}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="assignee"
            label="Assignee"
            placeholder="assignee"
            value={INITIAL_ASSET.assignee}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          value={INITIAL_ASSET.description}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </Container>
  );
}

export default CreateAsset;
