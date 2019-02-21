import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Item extends Component {
	state = {
		name: '',
		payments: []
	}
	componentDidMount(){
		const { group_id, item_id } = this.props.match.params
		axios.get(`http://localhost:8080/api/groups/${group_id}/items/${item_id}`)
		.then(response => {
			console.log('Back from the server')
			console.log(response)
			this.setState({
				name: response.data.name,
				payments: response.data.payments
			})
			console.log(this.state)
		})
		.catch(err => console.log(err))
	}

	render(){
		const { group_id } = this.props.match.params
		const { name, payments } = this.state
		const paymentHeader =  (
			<thead>
				<tr>
					<th>User</th>
					<th>Paid</th>
					<th>Received</th>
				</tr>
			</thead>
			) 
		const paymentList = (
			<tbody>
				{						
					payments.map(payment => {
						return  <tr key={payment._id}>
									<td>{payment.user.username}</td>
									<td>{payment.paid}</td>
									<td>{payment.received}</td>
								</tr>
					})
				}
			</tbody>
		) 

		return (
				<div className='container'>
					<h1>{name}</h1>
					<table>
						{paymentHeader}
						{paymentList}
					</table>
					<Link to={`/groups/${group_id}`} className='ui teal button'>Go back</Link>
				</div>
			)
	}
}

export default Item;