import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle } from 'reactstrap';
import {  withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constuctor() {
    this.loadQuestionDetails = this.routeChange.bind(this);
  }
  loadQuestionDetails(e, questionId) {
    let path = `/questions/`+questionId;
    this.props.history.push(path);
  }
  render() {
    const {question, auth} = this.props;
    return (
      <Card onClick={(e) => this.loadQuestionDetails(e, question.id)}>
        <CardBody>
          <CardTitle>Would You Rather</CardTitle>
          <ul>
            <li className={question.optionOne.votes.includes(auth) ? "optionSelected" : ""}>{question.optionOne.text}</li>
            <li className={question.optionTwo.votes.includes(auth) ? "optionSelected" : ""}>{question.optionTwo.text}</li>
          </ul>
        </CardBody>
      </Card>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps (state, { id }) {
  return {
    question : state.questions[id],
    auth: state.authedUser
  }
}

export default withRouter(connect(mapStateToProps, null)(Question))
