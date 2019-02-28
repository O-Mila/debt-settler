import React, { Component } from "react";
import axios from "axios";
import DebtsList from "./DebtsList";
import ItemList from "../item/ItemList";
import Balance from "./Balance";

class Group extends Component {
	state = {
		group: {
			name: '',
			users: []
		},
		balance: []
	}
	componentDidMount(){
		const { groups, index } = this.props
		axios.get(`http://localhost:8080/api/groups/${groups[index]._id}`)
		.then(response => {
			this.setState({
				group: response.data.group,
				balance: response.data.balance
			})
		})
		.catch(err => console.log(err));
	}
	componentDidUpdate(prevProps){
    	if(this.props.index !== prevProps.index){
    		this.componentDidMount()
    	}
  	}
	transferMade(){
		this.componentDidMount()
	}
	render(){
		const { name } = this.state.group;
		const { groups, index } = this.props;
		return (
			<div>
				<h1>{name}</h1>
				<Balance {...this.state} />
				<DebtsList {...this.state} {...this.props} group_id={groups[index]._id} 
					transferMade={this.transferMade.bind(this)} />
				<ItemList {...this.state} group_id={groups[index]._id} 
					groups={groups} index={index}/>		
			</div>
		)
	}
}

export default Group;