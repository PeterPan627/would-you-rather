import React from "react"
import PropTypes from "prop-types"
import {Button, Card, CardBody, CardHeader} from 'reactstrap';
import CardTitle from "reactstrap/es/CardTitle";

const NotFound = ({ history }) => (
  <Card>
    <CardHeader>404</CardHeader>
    <CardBody>
      <CardTitle>Page Not Found</CardTitle>
      <Button size="small" color="primary" onClick={() => history.push("/")}>
        Go Home
      </Button>
    </CardBody>
  </Card>
);

NotFound.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default NotFound
