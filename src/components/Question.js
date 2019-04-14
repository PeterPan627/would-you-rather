import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle } from 'reactstrap';
import {  withRouter } from 'react-router-dom';

class Question extends React.Component {
  constuctor() {
    this.loadQuestionDetails = this.routeChange.bind(this);
  }
  loadQuestionDetails(e, questionId) {
    let path = `/questions/`+questionId;
    this.props.history.push(path);
  }
  render() {
    const {question} = this.props;
    return (
      <Card onClick={(e) => this.loadQuestionDetails(e, question.id)}>
        <CardBody>
          <CardTitle>Would You Rather</CardTitle>
          <ul>
            <li>{question.optionOne.text}</li>
            <li>{question.optionTwo.text}</li>
          </ul>
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps (state, { id }) {
  return {
    question : state.questions[id],
    auth: state.authedUser
  }
}

export default withRouter(connect(mapStateToProps, null)(Question))
