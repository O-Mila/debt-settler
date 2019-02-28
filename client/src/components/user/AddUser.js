import React, { Component } from 'react';
import axios from 'axios';

class AddUser extends Component {
  state = {
    search: '',
    loading: false,
    suggestions: []
  }
  searchUser = e => {
    this.setState({ search: this.refs.search.value })
    if(this.state.search.length > 2){
      this.setState({ loading: true })
      axios.post('http://localhost:8080/api/users',
        { search: this.state.search, members: this.props.members })
      .then(response => {
        this.setState({
          suggestions: response.data,
          loading: false
        })
        if(!this.state.search){ 
          this.setState({ loading: false })
        }
      }).catch(err => console.log(err))      
    } else {
      this.setState({ suggestions: [], loading: false })
    }
  }
  deleteSuggestions = () => {
    this.setState({
      search: '',
      suggestions: []
    })
    this.refs.search.value = '';
  }
  render() {
    const { suggestions, loading } = this.state
    const isLoading = loading ? 'loading' : ''
    const { addMember } = this.props
    const suggestionsList = (
      <div>
        {
          suggestions.map(suggestion => {
            return  <div key={suggestion._id} className="fluid big ui button" 
                      onClick={() => { addMember(suggestion); this.deleteSuggestions() } }>
                        {suggestion.username}                        
                    </div>
          })
        }
      </div>
    )
    return (
          <div className={`ui fluid category ${isLoading} search w-100 h-50 centered`} >
            <div className="ui icon input w-100 centered">
              <input className="ui huge input prompt" type='text' onChange={this.searchUser} 
                placeholder="Add user..." name='search' ref='search' />
              <i onClick={this.searchUser} className="search icon"></i>
            </div>
            <div>{suggestionsList}</div>
          </div>
      )
  }
}

export default AddUser;