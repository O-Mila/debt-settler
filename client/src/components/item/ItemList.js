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
  render() {
    const { items } = this.state;
    const { group_id } = this.props
    const itemList = (
      <div className="list-group list-group-flush">
      {
        items.map(item => {
            return  <Link to={`/groups/${group_id}/items/${item._id}`} key={item._id} 
                      className='list-group-item list-group-item-action'>
                        {item.name}
                    </Link>
          })
      }
      </div>
      )
    return (
      <div>
        <div>{itemList}</div>
      </div>
    );
  }
}

export default ItemList;