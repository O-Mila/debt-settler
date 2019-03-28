import React, { Component } from "react";
import axios from "axios";
import GroupName from "./GroupName";
import MemberList from "./MemberList";
import AddUser from "./AddUser";
import Alert from "../shared/Alert";
import { Link } from 'react-router-dom';

class EditGroup extends Component {
  	constructor(props){
    	super(props)
    	this.state = {
  			group: {},
  			name: '',
  			oldMembers: [],
  			newMembers: [],
  			deletedMembers: [],
        alert: {
          message: '',
          type: ''
        }
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
    showAlert(message, type){
      this.setState({
        alert: { message: message, type: type }
      })
      setTimeout(() => this.setState({
        alert: {
          message: '',
          type: ''
        }
      }), 1500)
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
      	} else this.showAlert("You cannot delete a user who has debts to settle", 'warning')
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
    const { oldMembers, newMembers, deletedMembers, name } = this.state
		axios.put(`/api/groups/${group_id}`, 
      { oldMembers, newMembers, deletedMembers, name })
    .then(response => {
      if(response.data.name) window.history.back()
      else this.showAlert(response.data, 'warning')
    })
	}
  deleteGroup = () => {
    const { changeGroup, showAlert } = this.props
    axios.delete(`/api/groups/${this.state.group._id}`)
    .then(res => {
      window.history.back()
      changeGroup(0)
      showAlert(res.data, 'success')
    })
    .catch(err => window.history.back())
  }
	render(){
    const { oldMembers, newMembers, deletedMembers, group } = this.state
    const oldUsers = oldMembers ? oldMembers.map(member => member.user) : ''
    const deletedUsers = deletedMembers ? deletedMembers.map(member => member.user) : ''
    const debts = group.members ? group.members.some(member => member.debts.length) : ''
    const deleteButton = debts ? '' : (
      <div onClick={this.deleteGroup} className="ui red button">Delete group</div>
    )
		return (
			<div className="container h-75">
        <Alert {...this.state} />
        <form>
    			<GroupName {...this.state} handleChange={this.handleChange} />
    			<MemberList {...this.state} addNewMember={this.addNewMember} 
            addOldMember={this.addOldMember} deleteOldMember={this.deleteOldMember} 
            deleteNewMember={this.deleteNewMember} />
    			<AddUser {...this.state} addMember={this.addNewMember}
            members={[...oldUsers, ...deletedUsers, ...newMembers]} />
          <div className="ui yellow button" onClick={this.editGroup}>Accept</div>
          <Link to="/groups">
            <div className="ui teal button">Go back</div>
          </Link>
          {deleteButton}
        </form>
			</div>
		)
	}
}

export default EditGroup;