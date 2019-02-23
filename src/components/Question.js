import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'


class Question extends Component {
    render() {
        
        const { question } = this.props;
        
        const {
            author
        } = question
        return (
            <div className='question'>
              {author}
            
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    var options = {
        optionOneText: question.optionOne.text,
        optionTwoText: question.optionTwo.text,
        author: question.author
    }
    return {
        authedUser,
        question: formatQuestion(options)
    }
}


export default connect(mapStateToProps)(Question)