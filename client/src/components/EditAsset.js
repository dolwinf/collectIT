import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Form,
  Input,
  TextArea,
  Button,
  Message,
  Header,
  Icon,
  Container,
} from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";
import catchErrors from "../utils/catchErrors";

function EditAsset(props) {
  const [asset, setAsset] = useState();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/asset/${props.match.params.id}`)
      .then((response) => {
        setAsset(response.data.foundAsset);
      });
  }, []);

  async function handleDelete(id) {
    axios
      .delete(`http://localhost:4000/api/asset/delete/${id}`)
      .then((response) => {
        history.push("/");
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    console.log({ [name]: value });
    setAsset((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = cookie.get("token");
    console.log(token);
    try {
      e.preventDefault();

      setDisabled(true);
      setLoading(true);
      const assetData = await axios.put(
        `http://localhost:4000/api/asset/update/${props.match.params.id}`,
        asset,
        {
          headers: { Authorization: `${token}` },
        }
      );

      console.log(assetData);
      history.push("/");
    } catch (error) {
      catchErrors(error, setError);
    }
  }
  return asset ? (
    <Container>
      <Header as="h2" block>
        <Icon name="edit" color="orange" />
        Edit Asset
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
        </Form.Group>
        <Form.Group>
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
            name="category"
            label="Category"
            placeholder="category"
            value={asset.category}
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
          value={asset.description}
          onChange={handleChange}
        />

        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          content="Modify Asset"
          type="submit"
        />
      </Form>
      <br />
      <Button
        color="red"
        content="Delete Asset"
        onClick={(e) => handleDelete(asset._id)}
      />
    </Container>
  ) : (
    ""
  );
}

export default EditAsset;
