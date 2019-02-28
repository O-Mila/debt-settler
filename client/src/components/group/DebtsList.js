import React, { Component } from 'react';
import axios from 'axios';

class DebtsList extends Component {
	state = {
		payerIndex: '',
		consumerIndex: '',
		amount: ''
	}
	handlePayment = (i,j,amount) => {
		this.setState({
			payerIndex: i,
			consumerIndex: j,
			amount: amount
		})
		console.log(this.state)
	}
	handleChange = e => {
		this.setState({
			amount: e.target.value
		})
		console.log(this.state)
	}
	handleSubmit = (e,payer,receiver) => {
		e.preventDefault()
		console.log(this.state)
		const { group_id, transferMade } = this.props
		axios.post(`http://localhost:8080/api/groups/${group_id}/transfers/new`, { 
			payer: payer,
			receiver: receiver,
			amount: this.state.amount
		})
		.then(response => {
			console.log(response)
			this.setState({
				payerIndex: '',
				consumerIndex: '',
				amount: ''
			})
			console.log(this.state)
			transferMade()
		})
	}
	render(){
		const { payerIndex, consumerIndex } = this.state
		const { balance } = this.props
		const indebtedUsers = balance.filter(user => user.debt.amount.length)
		const indebted = indebtedUsers.length ? (
			<div>
				<div className="ui horizontal divider">Who owes who</div>					
				<div className="ui vertical segment">
				{
					indebtedUsers.map((user, i) =>
						<div key={user._id}>
							{
								user.debt.amount.map((amount, j) => 
									(i === payerIndex && j === consumerIndex) ?
									(
									<div key={user.debt.receiver[j]}>
										<form onSubmit={e => 
											this.handleSubmit(e,user.debt.receiver[j],user.username)} >
											{`${user.username} pays `}
											<input type='number' name='amount' value={this.state.amount}
												onChange={this.handleChange} />
											{` to ${user.debt.receiver[j]}`}
											<button>Transfer</button>
										</form>
									</div>
									) 

									: 

									(
									<div key={user.debt.receiver[j]} 
										onClick={() => this.handlePayment(i,j,amount)} >
											{`${user.username} owes ${amount} to ${user.debt.receiver[j]}`}
									</div>
									)
								)
							}
						</div>
					)
				}
				</div>
			</div>
		) : ''
		return (
			<div>{indebted}</div>
		)	
	}
}

export default DebtsList;