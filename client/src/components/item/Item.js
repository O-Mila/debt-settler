import React, { Component } from 'react';
import axios from 'axios';

class Item extends Component {
	state = {
		item: {},
		currency: ''
	}
	componentDidMount(){
		const { group_id, item_id } = this.props.match.params
		axios.get(`http://localhost:8080/api/groups/${group_id}/items/${item_id}`)
		.then(response => {
			this.setState({
				item: response.data.item,
				currency: response.data.currency
			})
		})
		.catch(err => console.log(err))
	}

	render(){
		const { item, currency } = this.state
		const paymentHeader = (
			<thead>
				<tr>
					<th scope="col">User</th>
					<th scope="col">Paid</th>
					<th scope="col">Consumed</th>
				</tr>
			</thead>
			) 
		const paymentList = item.payments ? (
			<tbody>
				{						
					item.payments.map(payment => {
						return  <tr key={payment._id}>
									<td>{payment.user.username}</td>
									<td>{payment.paid} {currency}</td>
									<td>{payment.received} {currency}</td>
								</tr>
					})
				}
			</tbody>
		) : ''

		return (
				<div className="container h-100">
					<div className="h-25 d-flex align-items-center justify-content-center">
						<h1>{item.name}</h1>
					</div>
					<div>
						<table className="table">
							{paymentHeader}
							{paymentList}
						</table>
					</div>
					<div className="ui teal button d-flex align-items-center justify-content-center" 
						onClick={() => window.history.back()}>
							Go back
					</div>
				</div>
			)
	}
}

export default Item;