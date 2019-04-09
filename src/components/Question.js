import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { handleAnswer } from '../actions/shared';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: this.props.answer
    };
    this.changeOption = this.changeOption.bind(this)
  }

  changeOption(opt) {
    const {dispatch, auth, question} = this.props;
    if (!this.state.answer) {
      if (opt === 1) {
        dispatch(handleAnswer(auth, question.id, 'optionOne'));
        this.setState({answer: 'optionOne'})
      } else if (opt === 2) {
        dispatch(handleAnswer(auth, question.id, 'optionTwo'));
        this.setState({answer: 'optionTwo'})
      }
    }
  }

  render() {
    const {question} = this.props;
    return (
      <Card>
        <CardBody>
          <CardTitle>Would You Rather</CardTitle>
          <ul>
            <li onClick={() => this.changeOption(1)}>{question.optionOne.text}</li>
            <li onClick={() => this.changeOption(2)}>{question.optionTwo.text}</li>
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
