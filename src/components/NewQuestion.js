import React, { Component } from 'react'


class NewQuestion extends Component {
    state = {
        text: '',
    }

    handleChange = (e) => {
        const text = e.target.value;

        this.setState(() => ({
            text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { text } = this.state
        // todo: Add Question to store

        console.log("Add new question to store", text)

        this.setState(() => ({
            text: ''
        }))

    }

    render() {
        const { text } = this.state
        const questionLeft = 280 - text.length
        return (
            <div>
                <h3 className='center'>Compose New Question</h3>
                <form className='new-question' onSubmit={this.handleSubmit}>
                <textarea
                    placeholder="Enter new question"
                    value={text}
                    onChange={this.handleChange}
                    className='textarea'
                    maxLength={280}
                />
                {questionLeft <= 100  && (
                    <div className='question-length'>
                        {questionLeft}
                    </div>
                )}
                <button
                 className='btn'
                 type='submit'
                 disabled={text === ''}
                >
                Submit

                      
                </button>
                </form>
            </div>
        )
    }
}

export default NewQuestion