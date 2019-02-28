import React, { Component } from 'react';
import axios from 'axios';
import Group from './Group';
import { Link } from 'react-router-dom';

class GroupList extends Component {
  state = {
	  groups: [],
    index: 0,
    show: false
  }
  componentDidMount(){
    const { _id } = this.props
    axios.get(`http://localhost:8080/api/${_id}/groups`)
    .then(response => {
      this.setState({
        groups: response.data.groups,
        show: true
      })
    })
    .catch(err => console.log(err))
  }
  changeGroup = (e, i) => {
    this.setState({ index: i })
  }
  render() {
    const { groups, show } = this.state;
    const showGroup = show ? <Group {...this.state} /> : ''
    const groupList = groups.length ? (
      <div>
        {
          groups.map((group, i) => {
            return  <div onClick={e => this.changeGroup(e, i)} key={group._id} 
                      className="circular ui button">                      
                        {group.name}                      
                    </div>
          })
        }
      </div>
    ) : '';
    return (
      <div className="container">
        <div>{showGroup}</div>
        <div className="ui section divider"></div>
        <div>{groupList}</div>
      	<Link to='/groups/new' className="ui teal button">Add group</Link>
      </div>
    );
  }
}

export default GroupList;