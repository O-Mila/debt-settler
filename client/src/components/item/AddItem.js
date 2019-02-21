import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class AddItem extends Component {
	state = {
		name: '',
		users: [],
		paid: [],
		received: {
			amounts: [], 
			benefits: []
		},
		total: Number,
		redirect: false,
		item_id: ''
	}
	componentDidMount(){
		const { group_id } = this.props.match.params;
		axios.get(`http://localhost:8080/api/groups/${group_id}`)
		.then(response => {
			this.setState({
				users: response.data.group.users
			})
			const { length } = this.state.users
			for(let i = 0; i < length; i++){
				this.setState(state => {
					const paid = state.paid.concat(0);
					const received = { 
						amounts: state.received.amounts.concat(0), 
						benefits: state.received.benefits.concat(true) 
					}
					return { paid, received, total: 0 }
				})
			}
			console.log(this.state)
		})
		.catch(err => {
			console.log(err);
		})
	}
	handleNameChange = e => {
    	this.setState({
      		[e.target.name]: e.target.value
    	})
    	console.log(this.state)
	}
	handlePaymentsChange = (i, e) => {
		e.persist()
		this.setState(state => {
			const paid = state.paid.map((payment, j) => {
				if (i === j) return e.target.value
				return payment
			})
			return { paid }
		})
		this.setState(state => {
			var total = 0;
			const { paid } = state
			for(let k = 0; k < paid.length; k++){
				total += Number(paid[k])
			}
			total = Math.round(total*100)/100
			return { total }
		})
		this.setState(state => {
			const { total, received } = state
			const consumers = received.benefits.filter(benefit => benefit).length
			console.log(consumers)
			const newAmounts = received.amounts.map((amount, i) => {
				if(received.benefits[i]) return Math.round(total/consumers*100)/100
				return 0
			})
			return { 
				received: { 
					amounts: newAmounts, 
					benefits: received.benefits 
				} 
			}
		})
		console.log(this.state)
	}
	handleConsumptionsChange = (i, e) => {
		e.persist()
		console.log(e.target)
		this.setState(state => {
			const { received, total } = state
			const newBenefits = received.benefits.map((benefit, j) => {
				if(i === j){
					if(e.target.checked) return true
					return false		
				}
				return benefit
			})
			const consumers = newBenefits.filter(benefit => benefit).length
			console.log(consumers)
			const newAmounts = received.amounts.map((amount, j) => {
				if(newBenefits[j]) return Math.round(total/consumers*100)/100
				return 0
			})
			return {
				received: {
					amounts: newAmounts,
					benefits: newBenefits
				}
			}
		})
		console.log(this.state)
	}
	addItem = e => {
		e.preventDefault()
		const { name, users, paid, received, total } = this.state
		if(total > 0){
			const { group_id } = this.props.match.params
			axios.post(`http://localhost:8080/api/groups/${group_id}/items`,
				{ name, users, paid, received: received.amounts, group_id })
			.then(response => {
				console.log(response)
				const item_id  = response.data._id
				this.setState({
					redirect: true,
					item_id: item_id
				})
			})
		}
		else {
			console.log('Someone has to pay!!!')
		}
	}
	render(){
		const { name, users, total, received, redirect, item_id } = this.state;
		const { group_id } = this.props.match.params; 
		if(redirect){
    		return <Redirect to={`/groups/${group_id}/items/${item_id}`} />
    	}
		const payers = (
			<div>
				<div>Payers</div>
				<table>
					<thead>
						<tr>
							<th>Username</th>
							<th>Amount paid</th>
						</tr>
					</thead>
					<tbody>
						{
							users.map((user, i) => {
								return  <tr key={user._id}>
											<td>{user.username}</td>
											<td>
												<input type='number' placeholder='0.00' name='paid' min='0'
												pattern="^\d*(\.\d{0,2})?$"
												step='0.01' onChange={e => this.handlePaymentsChange(i, e)} />
											</td>
										</tr>
							})
						}
					</tbody>
				</table>
			</div>
		)

		const consumers = (
			<div>
				<div>Consumers</div>
				<table>
					<thead>
						<tr>
							<th>Username</th>
							<th>Amount received</th>
							<th>Benefits</th>
						</tr>
					</thead>
					<tbody>
						{
							users.map((user, i) => {
								return  <tr key={user._id}>
											<td>{user.username}</td>
											<td>{received.amounts[i]}</td>
											<td>
												<input type='checkbox' name='received' 
												checked={received.benefits[i]}
												 onChange={e => this.handleConsumptionsChange(i,e)} 
												 />
											</td>
										</tr>
							})
						}
					</tbody>
				</table>
			</div>
		)

		return (
			<div>
				<form onSubmit={this.addItem}>
					<input type='text' onChange={this.handleNameChange} 
						name='name' placeholder='item name' />
					<div>{name}</div>
					<h3>Total: {total}</h3>
					<div>{payers}</div>
					<div>{consumers}</div>
					<button>Add item</button>
				</form>
			</div>
		)
	}
}

export default AddItem;