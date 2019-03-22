import React, { Component } from "react";
import axios from "axios";
import GroupName from "./GroupName";
import MemberList from "./MemberList";
import AddUser from "./AddUser";
import { Link } from 'react-router-dom';

class EditGroup extends Component {
  	constructor(props){
    	super(props)
    	this.state = {
  			group: {},
  			name: '',
  			oldMembers: [],
  			newMembers: [],
  			deletedMembers: []
		}
    	this.editGroup = this.editGroup.bind(this)
    	this.handleChange = this.handleChange.bind(this)
    	this.addNewMember = this.addNewMember.bind(this)
      this.addOldMember = this.addOldMember.bind(this)
   	 	this.deleteOldMember = this.deleteOldMember.bind(this)
  		this.deleteNewMember = this.deleteNewMember.bind(this)
  	}
	  componentDidMount(){
		  const { group_id } = this.props.match.params
		  axios.get(`/api/groups/${group_id}`)
		  .then(response => {
			  this.setState({
				  group: response.data,
				  name: response.data.name,
			    oldMembers: response.data.members
			  })
		  })
		  .catch(err => console.log(err))
	  }
  	handleChange = e => {
    	this.setState({
      		[e.target.name]: e.target.value
    	})
  	}
  	addNewMember = suggestion => {
    	this.setState({
    		newMembers: [...this.state.newMembers, suggestion]
    	})
  	}
    addOldMember = e => {
      const { oldMembers, deletedMembers } = this.state
      const index = deletedMembers.findIndex(deletedMember => 
        deletedMember.user.username === e.currentTarget.textContent)
      const deletedMember = deletedMembers[index]
      deletedMembers.splice(index, 1)
      this.setState({
        oldMembers: [...oldMembers, deletedMember],
        deletedMembers: deletedMembers
      })
    }
  	deleteOldMember = e => {
    	const { oldMembers } = this.state;
    	const { showAlert } = this.props;
    	const index = oldMembers.findIndex(oldMember => 
    		oldMember.user.username === e.currentTarget.textContent);
    	const deletedMember = oldMembers[index]
    	const hasDebts = deletedMember.balance !== 0
    	if(!hasDebts){
      		oldMembers.splice(index, 1);
      		this.setState({ 
      			oldMembers: oldMembers,
      			deletedMembers: [...this.state.deletedMembers, deletedMember]
      		})
      	} else showAlert("You cannot delete a user who has debts to settle", 'warning')
    }
    deleteNewMember = e => {
    	const { newMembers } = this.state;
    	const index = newMembers.findIndex(newMember => 
    		newMember.username === e.currentTarget.textContent);
    	newMembers.splice(index, 1);
    	this.setState({ newMembers: newMembers })
    }
	editGroup(){
		const { group_id } = this.props.match.params
    const { showAlert } = this.props
    const { oldMembers, newMembers, deletedMembers, name } = this.state
		axios.put(`/api/groups/${group_id}`, 
      { oldMembers, newMembers, deletedMembers, name })
    .then(response => {
      console.log(response)
      if(response.data.name) window.history.back()
      else showAlert(response.data, 'warning')
    })
	}
	render(){
    const { oldMembers, newMembers, deletedMembers } = this.state
		const oldUsers = oldMembers ? oldMembers.map(member => member.user) : ''
    const deletedUsers = deletedMembers ? deletedMembers.map(member => member.user) : ''
		return (
			<div className="container h-75">
        <form>
    			<GroupName {...this.state} handleChange={this.handleChange} />
    			<MemberList {...this.state} addNewMember={this.addNewMember} 
            addOldMember={this.addOldMember} deleteOldMember={this.deleteOldMember} 
            deleteNewMember={this.deleteNewMember} />
    			<AddUser {...this.state} addMember={this.addNewMember}
            members={[...oldUsers, ...deletedUsers, ...newMembers]} />
          <div className="ui yellow button" onClick={this.editGroup}>Edit Group</div>
          <Link to="/groups">
            <div className="ui teal button">Go back</div>
          </Link>
        </form>
			</div>
		)
	}
}

export default EditGroup