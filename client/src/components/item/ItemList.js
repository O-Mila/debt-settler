import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ItemList extends Component {
  state = {
  	  items: []
  }
  componentDidMount(){
    const { group_id } = this.props
    axios.get(`http://localhost:8080/api/groups/${group_id}/items`)
    .then(response => {
      console.log(response)
      this.setState({
        items: response.data})
    })
    .catch(err => console.log(err))
  }
  componentDidUpdate(prevProps){
    if(this.props.index !== prevProps.index){
      this.componentDidMount()
    }
  }
  render() {
    const { items } = this.state;
    const { group_id, groups, index } = this.props
    const itemList = items.length ? (
      <div>
        <div className="ui horizontal divider">Items</div>
        <div className="ui vertical segment">
        {
          items.map(item => {
              return  <Link to={`/groups/${group_id}/items/${item._id}`} key={item._id} 
                        className="ui yellow button">                      
                          {item.name}                      
                      </Link>
            })
        }
        <Link to={`/groups/${groups[index]._id}/items/new`}>
          <i className="plus big olive circle icon"></i>
        </Link>   
        </div>
      </div>
      ) : (
      <div>
        <div className="ui section divider"></div>
        <Link to={`/groups/${groups[index]._id}/items/new`} className="ui olive button">
          Add new item
        </Link>         
      </div>
      )
    return (
      <div>{itemList}</div>
    );
  }
}

export default ItemList;