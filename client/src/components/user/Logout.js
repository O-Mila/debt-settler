import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

class Logout extends Component {
	componentDidMount(){
		axios.get('http://localhost:8080/api/logout')
  		.then(res => {
    		this.props.logOut('Successfully signed out', 'info')
    	}).catch(err => {
    		this.props.showAlert('Oops! Something went wrong while logging out', 'danger')
  		})
	}
	render(){
		const { isLoggedIn } = this.props
		if (!isLoggedIn) {
			return <Redirect to='/groups' />
		}
		return <Redirect to='/login' />
	}
}

export default Logout;