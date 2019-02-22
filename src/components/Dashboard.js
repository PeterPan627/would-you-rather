import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
    render()
        {
            console.log("Dashboard");
            return (
                <div>
                    <h3 className="center">Your timeline</h3>
                    <ul className='dashboard-list'>
                        {this.props.questionIds.map((id) => (
                            <li key={id}>
                                <div>QUESTION ID: {id}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }}

function mapStateToProps({ questions }) {
    return {
        questionIds: Object.keys(questions)
          .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

 export default connect(mapStateToProps)(Dashboard)