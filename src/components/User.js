import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class User extends PureComponent {
  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <img src={user.avatarURL} className='avatar' alt={`Avatar of ${user.name}`}/>
        <span>{user.name}</span>
      </Fragment>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps ({ users }, { id }) {
  return {
    user : users[id]
  }
}


export default connect(mapStateToProps)(User)
