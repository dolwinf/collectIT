import React from "react";

import { Table, Rating, Container } from "semantic-ui-react";

function AssetList({
  name,
  model,
  brand,
  category,
  type,
  assignee,
  assetID,
  description,
}) {
  return (
    <Container>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>AssetID</Table.HeaderCell>
            <Table.HeaderCell singleLine>Name</Table.HeaderCell>
            <Table.HeaderCell singleLine>Asset Health</Table.HeaderCell>
            <Table.HeaderCell singleLine>Model</Table.HeaderCell>
            <Table.HeaderCell singleLine>Assigned To</Table.HeaderCell>
            <Table.HeaderCell singleLine>Category</Table.HeaderCell>
            <Table.HeaderCell singleLine>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <span style={{ fontSize: "2em" }}>
                <strong>{assetID}</strong>
              </span>
            </Table.Cell>
            <Table.Cell singleLine>{name}</Table.Cell>
            <Table.Cell>
              <Rating icon="star" defaultRating={5} maxRating={5} />
            </Table.Cell>
            <Table.Cell>{model}</Table.Cell>
            <Table.Cell>{assignee}</Table.Cell>
            <Table.Cell>{category}</Table.Cell>
            <Table.Cell>{description}</Table.Cell>
            <Table.Cell>{type}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
}

export default AssetList;
