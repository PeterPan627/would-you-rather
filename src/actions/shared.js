import { getInitialData } from '../utils/api'
import { addUserQuestion, saveUserAnswer, receiveUsers } from '../actions/users'
import { addQuestion, receiveQuestions } from '../actions/questions'
import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(({ users, questions})=> {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions))
        })
    }
}

export function handleAddQuestion (optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then((question) => {
            dispatch(addQuestion(question));
            dispatch(addUserQuestion(authedUser, question.id))
        })

    }
}

export function handleAnswer (auth, qid, option) {
    const info = {
      authedUser: auth,
      qid,
      answer: option
    };
    return (dispatch) => {
        saveQuestionAnswer(info)
          .then(() => {
              dispatch(saveUserAnswer(auth, qid, option))
          })
    }
}