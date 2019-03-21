import React, { Component } from "react";
import axios from "axios";
import DebtsList from "./DebtsList";
import TransactionList from "./TransactionList";
import Balance from "./Balance";

class ShowGroup extends Component {
	constructor(props){
		super(props)
		this.state = {
			group: {}
		}
		this.transferMade = this.transferMade.bind(this)
	}
	componentDidMount(){
		const { groups, index } = this.props
		if(groups.length){
			axios.get(`/api/groups/${groups[index]._id}`)
			.then(response => {
				this.setState({
					group: response.data
				})
			})
			//.catch(err => window.history.back());			
		}
	}
	componentDidUpdate(prevProps){
    	if(this.props !== prevProps){
    		this.componentDidMount()
    	}
  	}
	transferMade(){
		this.componentDidMount()
	}
	render(){
		const { group } = this.state;
		const balance = group.members ? <Balance {...this.state} /> : ''
		const debtsList = group.members ?	<DebtsList {...this.state}
			transferMade={this.transferMade} group_id={group._id} /> : ''
		const transactionList = group._id ? <TransactionList {...this.state} /> : ''
		return (
			<div>
				<h1 className="d-flex align-items-center justify-content-center h-25">
					{group.name}
				</h1>
				<div>{balance}</div>
				<div>{debtsList}</div>
				<div>{transactionList}</div>
			</div>
		)
	}
}

export default ShowGroup;