import React, { Component } from "react";
import AddGroupContent from "./content/AddGroupContent";
import LeftArrow from "../shared/LeftArrow";
import RightArrow from "./RightArrow";
import PagePoints from "../shared/PagePoints";
import axios from "axios";

class AddGroup extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      members: [{
        username: props.username,
        _id: props.user_id
      }],
      currency: '',
      page: 1
    }
    this.addGroup = this.addGroup.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.addMember = this.addMember.bind(this)
    this.deleteMember = this.deleteMember.bind(this)
  }
  addGroup = e => {
    e.preventDefault()
    const { name, currency, members } = this.state
    const { changeGroup, user_id } = this.props
    axios.post('http://localhost:8080/api/groups/new', 
      { name, currency, members })
    .then(response => {
      if(response.data.name){
        axios.post(`http://localhost:8080/api/groups/new/${response.data._id}`)      
        .then(response => {
          const index = response.data.map(user => user._id).indexOf(user_id)
          changeGroup(response.data[index].groups.length - 1)
          window.history.back()
        })
      } else {
        this.props.showAlert(response.data, 'warning');        
      }
    })
    .catch(err => console.log(err))
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state)
  }
  addMember = suggestion => {
    this.setState({
      members: [...this.state.members, suggestion]
    })
  }
  deleteMember = e => {
    const { members, page } = this.state;
    const index = members.findIndex(member => member.username === e.currentTarget.textContent);
    if(index !== 0){
      members.splice(index, 1);
      this.setState({ members: members })
      if(page === 4 && members.length < 2) {
        this.setState({ page: 3 })
      }      
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

  render() {
    if(this.state.page === 0){
      window.history.back()
    }
    return (
      <div className="row h-75">
        <LeftArrow {...this.state} previousPage={this.previousPage} />
        <div className="col-8">
          <AddGroupContent {...this.state} handleChange={this.handleChange} 
            addMember={this.addMember} deleteMember={this.deleteMember} addGroup={this.addGroup} />
          <PagePoints {...this.state} />
        </div>
        <RightArrow {...this.state} nextPage={this.nextPage} />
      </div>
    )
  }
}

export default AddGroup;