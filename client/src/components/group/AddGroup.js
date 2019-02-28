import React, { Component } from 'react';
import { Redirect } from 'react-router';
import AddUser from '../user/AddUser';
import axios from 'axios';

class AddGroup extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      members: [{
        username: props.username,
        _id: props._id
      }],
      page: 1,
      redirect: false
    }
    this.addGroup = this.addGroup.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  addGroup = e => {
    e.preventDefault()
    const { name, members } = this.state
    axios.post('http://localhost:8080/api/groups/new', 
      { name: name, members: members })
    .then(response => {
      if(response.data.name){
        axios.get(`http://localhost:8080/api/groups/new/${response.data._id}`)      
        .then(() => {
          this.setState({
            redirect: true
          })
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
  }
  addMember = suggestion => {
    this.setState({
      members: [...this.state.members, suggestion]
    })
  }
  deleteMember = e => {
    const { members, page } = this.state;
    const index = members.findIndex(member => member.username === e.currentTarget.textContent); 
    members.splice(index, 1);
    this.setState({ members: members })
    if(page === 3 && members.length < 2) {
      this.setState({ page: 2 })
    }
  }
  previousPage = () => {
    const { page } = this.state
    if(page > 1){
      this.setState({ page: page - 1 })
    }
  }
  nextPage = () => {
    const { page } = this.state
    if(page < 3){
      this.setState({ page: page + 1})
    }
  }
  memberList = () => {
    const { members } = this.state
    const size = members.length > 8 ? 'medium' : 'big'
    const memberClass = `ui ${size} teal basic button members`

    return (
    <div className="h-100 members">
      {
        members.map(member => {
          return  <div key={member._id} className={memberClass} 
                    onClick={this.deleteMember}>
                      {member.username}
                  </div>
        })
      }
    </div>
    )
  }

  pageContent = () => {
    const { name, page } = this.state
    if(page === 1){
      return (
          <div className="ui massive input alignment">
            <input type='text' placeholder="Group name..." value={name} name="name"
              onChange={this.handleChange}  />
          </div>
      )
    } else if(page === 2){
      return (
        <div className="alignment h-100 w-100">
          <div className="h-50">{this.memberList()}</div>
          <AddUser {...this.state} addMember={this.addMember}/>
        </div>
      )
    } else {
      return (
        <div className="w-100">
          <form onSubmit={this.addGroup}>
            <div className="w-100 title">{name}</div>
            <div>{this.memberList()}</div>
            <button className="ui fluid huge teal button">Add group</button>
          </form>
        </div>
      )
    }
  }

  render() {
    const { redirect, page, name, members } = this.state

    if (redirect) return <Redirect to='/groups'/>

    const hiddenLeft = page > 1 ? '' : 'hidden'
    const previousPage = (
      <i className={`huge teal chevron left icon ${hiddenLeft}`} onClick={this.previousPage}></i>)

    const hiddenRight = (page === 1 && name) || (page === 2 && members.length > 1) ? '' : 'hidden'
    const nextPage = (
      <i className={`huge teal chevron right icon ${hiddenRight}`} onClick={this.nextPage}></i>)

    const points = (
      <div className="alignment">
      {
        [...Array(3)].map((icon, index) => {
          const marked = page !== index + 1 ? 'outline' : ''
          return <i className={`teal circle ${marked} icon`} key={index}></i>
        })
      }
      </div>
    )
    return (
      <div className="row h-75">
        <div className="col container arrow-container">{previousPage}</div>
        <div className="col-8">
          <div className="row h-75">{this.pageContent()}</div>
          <div className="row h-25">{points}</div>
        </div>
        <div className="col container arrow-container">{nextPage}</div>
      </div>
    )
  }
}

export default AddGroup;