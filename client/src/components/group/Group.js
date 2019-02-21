import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DebtsList from './DebtsList';
import ItemList from '../item/ItemList';

class Group extends Component {
	state = {
		group: {
			name: '',
			users: []
		},
		balance: []
	}
	componentDidMount(){
		console.log(this.state)
		const { group_id } = this.props.match.params
		axios.get(`http://localhost:8080/api/groups/${group_id}`)
		.then(response => {
			console.log(response.data)
			this.setState({
				group: response.data.group,
				balance: response.data.balance
			})
		})
		.catch(err => console.log(err));
	}
	transferMade(){
		this.componentDidMount()
	}
	render(){
		const { name } = this.state.group;
		const { group_id } = this.props.match.params
		return (
				<div>
					<h1>{name}</h1>
					<DebtsList {...this.state} {...this.props} group_id={group_id} 
						transferMade={this.transferMade.bind(this)} />
					<ItemList {...this.state} group_id={group_id} />					
					<Link to='/groups' className='ui left floated teal button'>Go back</Link>
					<Link to={`/groups/${group_id}/items/new`} 
						className='ui right floated yellow button'>Add new item</Link>
				</div>
			)
	}
}

export default Group;