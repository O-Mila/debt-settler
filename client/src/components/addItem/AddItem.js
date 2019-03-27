import React, { Component } from "react";
import AddItemContent from "./content/AddItemContent";
import LeftArrow from "../shared/LeftArrow";
import RightArrow from "./RightArrow";
import PagePoints from "../shared/PagePoints";
import axios from "axios";
import { twoDecimals } from "../../actions/index.js";

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
		this.handleConsumptionsAmountsChange = this.handleConsumptionsAmountsChange.bind(this)
		this.handleConsumptionsBenefitsChange = this.handleConsumptionsBenefitsChange.bind(this)
		this.addItem = this.addItem.bind(this)
		this.previousPage = this.previousPage.bind(this)
		this.nextPage = this.nextPage.bind(this)
	}
	componentDidMount(){
		const { group_id } = this.props.match.params;
		axios.get(`/api/groups/${group_id}`)
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
		.catch(err => this.props.logOut())
	}
	handleNameChange = e => {
    	this.setState({
      		[e.target.name]: e.target.value
    	})
	}
	handlePrecision = (newAmounts, total) => {
		var k = 0
		var totalAmount = newAmounts.reduce((acc, a) => acc + a)
		while(total !== twoDecimals(totalAmount)){
		 	if(total > twoDecimals(totalAmount)) {
				totalAmount = totalAmount + Number(0.01)
				if (newAmounts[k] !== 0) newAmounts[k] = 
					twoDecimals(newAmounts[k] + Number(0.01))
			} else {
				totalAmount = totalAmount - Number(0.01)
				if (newAmounts[k] !== 0) newAmounts[k] =
					twoDecimals(newAmounts[k] - Number(0.01))
			}
			k++
		}
	}
	handlePaymentsChange = (i, e) => {
		e.persist()
		// Update payments array
		this.setState(state => {
			const paid = state.paid.map((payment, j) => {
				if (i === j) return twoDecimals(e.target.value)
				return payment
			})
			return { paid }
		})
		// Update total paid
		this.setState(state => {
			var total = 0;
			const { paid } = state
			for(let k = 0; k < paid.length; k++){
				total += Number(paid[k])
			}
			total = twoDecimals(total)
			return { total }
		})
		// Update consumptions array
		this.setState(state => {
			const { total, received } = state
			const consumers = received.benefits.filter(benefit => benefit).length
			const newAmounts = received.amounts.map((amount, i) => {
				if(received.benefits[i]) return twoDecimals(total/consumers)
				return 0
			})
			this.handlePrecision(newAmounts, total)
			return {
				received: { 
					amounts: newAmounts, 
					benefits: received.benefits 
				} 
			}
		})
	}
	handleConsumptionsAmountsChange = (i, e) => {
		e.persist()
		this.setState(state => {
			const { received } = state
			const newAmounts = received.amounts.map((amount, j) => {
				if (i === j) return twoDecimals(e.target.value)
				return amount
			})
			return { 
				received: {
					amounts: newAmounts,
					benefits: received.benefits
				}
			}
		})
	}
	handleConsumptionsBenefitsChange = (i, e) => {
		e.persist()
		this.setState(state => {
			const { received, total } = state
			// Update benefits (boolean)
			const newBenefits = received.benefits.map((benefit, j) => {
				if(i === j){
					if(e.target.checked) return true
					return false
				}
				return benefit
			})
			// Update amounts
			const consumers = newBenefits.filter(benefit => benefit).length
			const newAmounts = received.amounts.map((amount, j) => {
				if(newBenefits[j]) return twoDecimals(total/consumers)
				return 0
			})
			this.handlePrecision(newAmounts, total)
			return {
				received: {
					amounts: newAmounts,
					benefits: newBenefits
				}
			}
		})
	}
	addItem = e => {
		e.preventDefault()
		const { name, group, paid, received, total } = this.state
		if(total > 0){
			const { group_id } = this.props.match.params
			axios.post(`/api/groups/${group_id}/items`,
				{name, members: group.members, paid, received: received.amounts, total, group_id})
			.then(response => {
				if(response.data.name){
					axios.post(`/api/groups/${group_id}/items/new`,
						{ item_id: response.data._id })
					.then(() => {
						axios.put(`/api/groups/${group_id}/debts`)
						.then(() => window.history.back())
						.catch(err => window.history.back())
					})
					.catch(err => window.history.back())
				} else {
					this.props.showAlert(response.data, 'warning');
				}
			})
			.catch(err => window.history.back())
		} else window.history.back()
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
      	<div className="ui equal width grid h-75">
        	<LeftArrow {...this.state} previousPage={this.previousPage} />
        	<div className="eight wide column">
	          	<AddItemContent {...this.state} handleNameChange={this.handleNameChange}
	          		handlePaymentsChange={this.handlePaymentsChange} addItem={this.addItem}
	          		handleConsumptionsBenefitsChange={this.handleConsumptionsBenefitsChange} 
	          		handleConsumptionsAmountsChange={this.handleConsumptionsAmountsChange} />
	          	<PagePoints {...this.state} />
        	</div>
        	<RightArrow {...this.state} nextPage={this.nextPage} />
      	</div>
		)
	}
}

export default AddItem;