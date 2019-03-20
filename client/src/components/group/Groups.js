import React, { Component } from 'react';
import axios from 'axios';
import ShowGroup from './ShowGroup';
import GroupList from './GroupList';

class Groups extends Component {
  state = {
	  groups: []
  }
  componentDidMount(){
    const { user_id } = this.props
    axios.get(`http://localhost:8080/api/${user_id}/groups`)
    .then(response => {
      if(response.data.groups){
        this.setState({
          groups: response.data.groups
        })
      }
    })
    .catch(err => window.history.back())
  }
  render() {
    const { groups } = this.state;
    const { index, changeGroup } = this.props
    const showGroup = groups.length ? <ShowGroup {...this.state} index={index} /> : 
      <h1 className="d-flex align-items-center justify-content-center h-25">
        You have no groups.
      </h1>

    return (
      <div className="container h-100">
        {showGroup}
        <GroupList {...this.state} changeGroup={changeGroup} />
      </div>
    );
  }
}

export default Groups;