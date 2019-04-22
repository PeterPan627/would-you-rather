import React, { PureComponent } from 'react';
import { Card, CardHeader,CardBody, CardTitle, FormGroup, Label, Input, Form, Button, Row, Col} from 'reactstrap';
import { connect } from 'react-redux';
import User from './User';
import { handleAnswer } from '../actions/shared';
import PropTypes from 'prop-types';

class QuestionDetails extends PureComponent {
  state = {
    selectedOption: ''
  };

  radioSelected = (e) => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveQuestionAnswer(this.state.selectedOption);
  };

  render() {
    const { question, questionAuthor, answer, total, percOne, percTwo} = this.props;
    const { selectedOption } = this.state;

    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <User id={questionAuthor.id}/>
            </CardHeader>
            <CardBody>
              <CardTitle>Would You Rather</CardTitle>
              {answer ?
                <div>
                  <FormGroup>
                    <FormGroup check disabled>
                      <Label check>
                        <Input type="radio" checked={answer==="optionOne"} readOnly/>{' '}
                        {question.optionOne.text}
                      </Label>
                    </FormGroup>
                    <FormGroup check disabled>
                      <Label check>
                        <Input type="radio" checked={answer==="optionTwo"} readOnly/>{' '}
                        {question.optionTwo.text}
                      </Label>
                    </FormGroup>
                  </FormGroup>
                  <div className="progress">
                    <div className="progress-one" style={{ width: `${percOne}%` }}>{`${percOne}%`}</div>
                    <div className="progress-two" style={{ width: `${percTwo}%` }}>{`${percTwo}%`}</div>
                  </div>
                  <div className="total">
                    Total number of votes: {total}
                  </div>
                </div>:
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup tag="fieldset">
                    <FormGroup >
                      <Label >
                        <Input type="radio" name="radio1" value="optionOne" onChange={this.radioSelected} />{' '}
                        {question.optionOne.text}
                      </Label>
                    </FormGroup>
                    <FormGroup >
                      <Label >
                        <Input type="radio" name="radio1" value="optionTwo" onChange={this.radioSelected} />{' '}
                        {question.optionTwo.text}
                      </Label>
                    </FormGroup>
                  </FormGroup>
                  <Button disabled={selectedOption === ''}>Submit</Button>
                </Form>
              }
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

QuestionDetails.propTypes = {
  question: PropTypes.object,
  questionAuthor: PropTypes.object,
  answer: PropTypes.string,
  percOne: PropTypes.string.isRequired,
  percTwo: PropTypes.string.isRequired
};

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

function mapStateToProps ({ questions, users, authedUser }, { match }) {
  const answers = users[authedUser].answers;
  let answer, percOne, percTwo, total;
  const { id } = match.params;
  const question = questions[id];
  if (answers.hasOwnProperty(question.id)) {
    answer = answers[question.id]
  }
  const questionAuthor = users[question.author];
  total = question.optionOne.votes.length + question.optionTwo.votes.length;
  percOne = financial((question.optionOne.votes.length / total) * 100);
  percTwo = financial((question.optionTwo.votes.length / total) * 100);
  return {
    question,
    questionAuthor,
    answer,
    total,
    percOne,
    percTwo
  }
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params;

  return {
    saveQuestionAnswer: (answer) => {
      dispatch(handleAnswer(id, answer))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails)
