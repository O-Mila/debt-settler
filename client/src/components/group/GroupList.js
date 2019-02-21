import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class GroupList extends Component {
  state = {
  	  groups: []
  }
  componentDidMount(){
    const { _id } = this.props
    axios.get(`http://localhost:8080/api/${_id}/groups`)
    .then(response => {
      this.setState({
      groups: response.data.groups})
    })
    .catch(err => console.log(err))
  }
  render() {
    const { groups } = this.state;
    const { username } = this.props;
    const header = username[username.length - 1] === 's' ? 
      <h1>{`${username}' Groups`}</h1> : <h1>{`${username}'s Groups`}</h1>
    const groupList = groups.length ? (
      <div className="list-group list-group-flush">
        {
          groups.map(group => {
            return  <Link to={`/groups/${group._id}`} key={group._id} 
                      className='list-group-item list-group-item-action' >                      
                        {group.name}                      
                    </Link>
          })
        }
      </div>
    ) : <p>You do not have any group yet. Lonely!!!</p>;
    return (
      <div className="container">
      	<div>{header}</div>
        <div>{groupList}</div>
      	<Link to='/groups/new' className='ui teal button'>Add group</Link>
      </div>
    );
  }
}

export default GroupList;