import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
	state = {
		username: '',
		password: '',
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		axios.post('http://localhost:8080/api/register', {
			username: this.state.username,
			password: this.state.password
		}).then(res => {
			if(res.data.username){
				this.props.logIn(res.data.username, res.data._id, 'Successfully signed in', 'success')
				window.history.back();
			} else {
				this.props.showAlert(res.data, 'warning');
			}
		}).catch(err => console.log(err))
	}
	render(){
		return (
			<div className='container'>
				<form onSubmit={this.handleSubmit} className='ui form'>
					<div className="field">
						<label>Username
							<input type='text' name='username' placeholder="username" 
								onChange={this.handleChange} required />
						</label>
					</div>
					<div className="field">
						<label>Password
							<input type='password' name='password' placeholder="password" 
								onChange={this.handleChange} required />
						</label>
					</div>
					<button className='ui teal button'>Register</button>

				</form>

				<div>
					Do you have an account already?
					<span><Link to='/login'>Login here</Link></span>
				</div>
			</div>
		)
	}
}

export default Register;