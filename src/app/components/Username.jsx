import React from 'react';
import {connect} from 'react-redux';

const Username = ({name}) => {
  return (
    <span className="username">
      {name}
    </span>
  )
};

const mapStateToProps = (state, ownProps) => {
  return state.users.find(user=>user.id === ownProps.id)
};

export const ConnectedUsername = connect(mapStateToProps)(Username);