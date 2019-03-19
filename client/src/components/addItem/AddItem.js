import React, { Component } from "react";
import AddItemContent from "./content/AddItemContent";
import LeftArrow from "../shared/LeftArrow";
import RightArrow from "./RightArrow";
import PagePoints from "../shared/PagePoints";
import axios from "axios";

class AddItem extends Component {
	constructor(props){
		super(props)
		this.state = {
			name: '',
			group: {},
			paid: [],
			received: {
				amounts: [],
				benefits: []
			},
			total: Number,
			page: 1			
		}
		this.handleNameChange = this.handleNameChange.bind(this)
		this.handlePaymentsChange = this.handlePaymentsChange.bind(this)
		this.handleConsumptionsChange = this.handleConsumptionsChange.bind(this)
		this.addItem = this.addItem.bind(this)
		this.previousPage = this.previousPage.bind(this)
		this.nextPage = this.nextPage.bind(this)
	}
	componentDidMount(){
		const { group_id } = this.props.match.params;
		axios.get(`http://localhost:8080/api/groups/${group_id}`)
		.then(response => {
			this.setState({
				group: response.data
			})
			const { length } = this.state.group.members
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
		})
		.catch(err => {
			console.log(err);
		})
	}
	handleNameChange = e => {
    	this.setState({
      		[e.target.name]: e.target.value
    	})
	}
	twoDecimals = amount => {
		return Math.round(amount * 100)/100
	}
	handlePrecision = (newAmounts, total) => {
		var k = 0
		var totalAmount = newAmounts.reduce((acc, a) => acc + a)
		while(total !== this.twoDecimals(totalAmount)) {
		 	if(total > this.twoDecimals(totalAmount)) {
				totalAmount = totalAmount + Number(0.01)
				if (newAmounts[k] !== 0) newAmounts[k] = 
					this.twoDecimals(newAmounts[k] + Number(0.01))
			} else {
				totalAmount = totalAmount - Number(0.01)
				if (newAmounts[k] !== 0) newAmounts[k] =
					this.twoDecimals(newAmounts[k] - Number(0.01))
			}
			k++
		}
	}
	// updateConsumptions = (received, total, consumers) => {
	// 	return (
	// 		received.amounts.map((amount, i) => {
	// 			if(received.benefits[i]) return Math.round(total/consumers*100)/100
	// 			return 0
	// 		})
	// 	)
	// }
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
			total = this.twoDecimals(total)
			return { total }
		})
		this.setState(state => {
			const { total, received } = state
			const consumers = received.benefits.filter(benefit => benefit).length
			const newAmounts = received.amounts.map((amount, i) => {
				if(received.benefits[i]) return this.twoDecimals(total/consumers)
				return 0
			})
			//const newAmounts = this.updateConsumptions(received, total, consumers)
			this.handlePrecision(newAmounts, total)
			return {
				received: { 
					amounts: newAmounts, 
					benefits: received.benefits 
				} 
			}
		})
	}
	handleConsumptionsChange = (i, e) => {
		e.persist()
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
			const newAmounts = received.amounts.map((amount, j) => {
				if(newBenefits[j]) return this.twoDecimals(total/consumers)
				return 0
			})
			//const newAmounts = this.updateConsumptions(received, total, consumers)
			this.handlePrecision(newAmounts, total)
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
		const { name, group, paid, received, total } = this.state
		if(total > 0){
			const { group_id } = this.props.match.params
			axios.post(`http://localhost:8080/api/groups/${group_id}/items`,
				{name, members: group.members, paid, received: received.amounts, total, group_id})
			.then(response => {
				axios.post(`http://localhost:8080/api/groups/${group_id}/items/new`,
					{ item_id: response.data._id })
				.then(() => {
					axios.put(`http://localhost:8080/api/groups/${group_id}/debts`)
					.then(() => window.history.back())
					.catch(err => console.log(err))
				})
				.catch(err => console.log(err))
			})
			.catch(err => console.log(err))
		} else {
			console.log('Someone has to pay!!!')
		}
	}
  	previousPage = () => {
    	const { page } = this.state
    	if(page > 0){
        	this.setState({ page: page - 1 })
    	}
  	}
    nextPage = () => {
    	const { page } = this.state
    	if(page < 4){
        	this.setState({ page: page + 1})
    	}
    }
	render(){
		if(this.state.page === 0) window.history.back()
		return (
      	<div className="row h-75">
        	<LeftArrow {...this.state} previousPage={this.previousPage} />
        	<div className="col-8">
	          	<AddItemContent {...this.state} handleNameChange={this.handleNameChange}
	          		handlePaymentsChange={this.handlePaymentsChange} addItem={this.addItem}
	          		handleConsumptionsChange={this.handleConsumptionsChange} />
	          	<PagePoints {...this.state} />
        	</div>
        	<RightArrow {...this.state} nextPage={this.nextPage} />
      	</div>
		)
	}
}

export default AddItem;