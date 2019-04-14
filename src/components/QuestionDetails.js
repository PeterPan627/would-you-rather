import React, { PureComponent } from 'react';
import { Card, CardHeader,CardBody, CardTitle, FormGroup, Label, Input, Form, Button, Row, Col} from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import User from './User';
import { handleAnswer } from '../actions/shared';

class QuestionDetails extends PureComponent {
  state = {
    selectedOption: '',
    redirect: false
  };

  radioSelected = (e) => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveQuestionAnswer(this.state.selectedOption)
    this.setState({redirect: true})
  };

  render() {
    const { question, questionAuthor} = this.props;
    const { selectedOption, redirect } = this.state;
    if (redirect) {
        return <Redirect to='/' />
        }

    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <User id={questionAuthor.id}/>
            </CardHeader>
            <CardBody>
              <CardTitle>Would You Rather</CardTitle>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup tag="fieldset">
                    <FormGroup >
                      <Label >
                        <Input type="radio" name="radio1" value="optionOne" onChange={this.radioSelected}/>{' '}
                        {question.optionOne.text}
                      </Label>
                    </FormGroup>
                    <FormGroup >
                      <Label >
                        <Input type="radio" name="radio1" value="optionTwo" onChange={this.radioSelected}/>{' '}
                        {question.optionTwo.text}
                      </Label>
                    </FormGroup>
                  </FormGroup>
                  <Button disabled={selectedOption === ''}>Submit</Button>
                </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps ({ questions, users, authedUser }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const questionAuthor = users[question.author];
  return {
    question,
    questionAuthor,
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
