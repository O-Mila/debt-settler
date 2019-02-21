import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    const { render: Component, ...props } = this.props

    return (
      <Route {...props}  render= {props => this.props.isLoggedIn ?
        <Component {...props} /> : <Redirect to='/login' /> }
      />
    )
  }
}

export default PrivateRoute;