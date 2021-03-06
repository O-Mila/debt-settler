import React, { Component } from "react";
import SuggestionsList from "./SuggestionsList";
import axios from "axios";

class AddUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      search: '',
      loading: false,
      suggestions: []
    }
  this.searchUser = this.searchUser.bind(this)
  this.deleteSuggestions = this.deleteSuggestions.bind(this)
  }

  searchUser = e => {
    this.setState({ search: this.refs.search.value })
    if(this.state.search.length > 2){
      this.setState({ loading: true })
      axios.post('/api/users',
        { search: this.state.search, members: this.props.members })
      .then(response => {
        this.setState({
          suggestions: response.data,
          loading: false
        })
        if(!this.state.search){ 
          this.setState({ loading: false })
        }
      })      
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
    const { loading } = this.state
    const isLoading = loading ? 'loading' : ''

    return (
          <div className={`ui fluid category ${isLoading} search w-100 h-25 centered mt-3 mb-1`} >
            <div className="ui icon input w-100 centered">
              <input className="ui huge input prompt" type='text' onChange={this.searchUser} 
                placeholder="Add user..." name='search' ref='search' />
              <i onClick={this.searchUser} className="search icon"></i>
            </div>
            <SuggestionsList {...this.state} {...this.props}
              deleteSuggestions={this.deleteSuggestions} />
          </div>
      )
  }
}

export default AddUser;