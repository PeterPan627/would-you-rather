import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logoutUser } from '../actions/auth'

class Logout extends Component {
  componentWillMount () {
    this.props.dispatch(logoutUser())
  }
  render () {
    return <Redirect to='/' />
  }
}

export default connect()(Logout)
