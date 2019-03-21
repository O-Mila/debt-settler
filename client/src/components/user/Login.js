import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
//import { domain } from "../../actions/index.js"

class Login extends Component {
	state = {
		username: '',
		password: ''
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		axios.post('/api/login', {
			username: this.state.username,
			password: this.state.password
		}).then(res => {
			this.props.logIn(res.data[0].username, res.data[0]._id, 'Successfully signed in', 'success')
			
		}).catch(err => {
			this.props.showAlert('User not found', 'danger')
		})
	}
	render(){
		const { isLoggedIn } = this.props
		if (isLoggedIn) {
			return <Redirect to='/groups' />
		}
		return (
			<div className="container">
				<div>
					<form onSubmit={this.handleSubmit} className="ui form">

						<div className="field">
							<label>Username
								<input type='text' name='username' placeholder='username'
									onChange={this.handleChange} required />
							</label>
						</div>

						<div className="field">
							<label>Password
								<input type='password' name='password' placeholder='password' 
									onChange={this.handleChange} required />
							</label>
						</div>

						<button type="submit" className="ui teal button">Log in</button>

					</form>
				</div>
				<div>
					You don't have an account yet?
					<span><Link to='/register'>Register here</Link></span>
				</div>
			</div>
		)
	}
}

export default Login;