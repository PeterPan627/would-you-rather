import React from 'react';
import { connect } from 'react-redux'
import { Card, CardBody, CardTitle} from 'reactstrap';
import { withRouter } from 'react-router-dom'

const Question = (props) => {
  const { question } = props;
  return (
    <Card>
      <CardBody>
        <CardTitle>Would You Rather</CardTitle>
        <ul>
          <li>{question.optionOne.text}</li>
          <li>{question.optionTwo.text}</li>
        </ul>
      </CardBody>
    </Card>
  )
};

function mapStateToProps ({ questions }, { id }) {
  return {
    question : questions[id]
  }
}

export default withRouter(connect(mapStateToProps, null)(Question))
