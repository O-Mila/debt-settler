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
	}
	handleChange = e => {
		this.setState({
			amount: e.target.value
		})
	}
	handleSubmit = (e, payer_id, receiver_id) => {
		e.preventDefault()
		const { amount } = this.state
		const { group_id, transferMade, logOut } = this.props
		axios.post(`/api/groups/${group_id}/transfers/new`, 
			{ payer_id, receiver_id, amount })
		.then(() => axios.put(`/api/groups/${group_id}/debts`))
		.then(() => {
			this.setState({
				payerIndex: '',
				consumerIndex: '',
				amount: ''
			})
			transferMade()			
		})
		.catch(err => logOut())
	}
	render(){
		const { payerIndex, consumerIndex } = this.state
		const { members, currency } = this.props.group
		const indebtedUsers = members.filter(member => member.debts.length)
			.sort((a, b) => 
			Math.max(a.debts.map(debt => debt.amount))
			< Math.max(b.debts.map(debt => debt.amount))
			? 1 : -1)
		const indebted = indebtedUsers.length ? (
			<div className="row justify-content-around">
			{
				indebtedUsers.map((member, i) =>
					<span key={member._id}>
					{
						member.debts.map((debt, j) => 
							(i === payerIndex && j === consumerIndex) ?
							(
							<span key={debt._id} className="ui black basic button">
								{`${member.user.username} pays `}
								<span className="ui transparent input">
									<input type='number' name='amount' className="transfInput"
									value={this.state.amount} onChange={this.handleChange} />
									{`${currency} to ${debt.receiver.username}`}
								</span>
								<span>   </span>
								<span className="mini green ui button mb-1" onClick={e => 
								this.handleSubmit(e, member.user._id, debt.receiver._id)}>
									Transfer
								</span>
							</span>
							) 

							: 

							(
							<span key={debt._id} className="ui teal button mb-1"
								onClick={() => this.handlePayment(i, j, debt.amount)} >
								{`${member.user.username} owes ${debt.amount} ${currency} 
								to ${debt.receiver.username}`}
							</span>
							)
						)
					}
					</span>
				)
			}
			</div>
		) : <div className="centered">No one owes nothing to anyone.</div>
		return (
			<div>
				<div className="ui horizontal divider">
					<i className="calculator icon"></i>
					<div className="section-title">Debt Settlement</div>
				</div>					
				<div className="ui vertical segment nullpadding">{indebted}</div>
			</div>
		)	
	}
}

export default DebtsList;