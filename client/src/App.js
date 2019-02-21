import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import GroupList from './components/group/GroupList';
import AddGroup from './components/group/AddGroup';
import Group from './components/group/Group';
import ItemList from './components/item/ItemList';
import AddItem from './components/item/AddItem';
import Item from './components/item/Item';
import Login from './components/user/Login';
import Logout from './components/user/Logout';
import Register from './components/user/Register';
import PrivateRoute from './components/PrivateRoute';
import NotLoggedRoute from './components/NotLoggedRoute';
import { BrowserRouter, Switch } from 'react-router-dom';

class App extends Component {
  constructor(){
  	super()
  	this.state = {
  		isLoggedIn: false,
  		username: '',
      _id: '',
      alert: {
        message: '',
        type: ''
      }
  	}
  	this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.showAlert = this.showAlert.bind(this)
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
    }), 1000)
  }
  logIn(username, _id, message, type){
    this.showAlert(message, type)
    this.setState({
      isLoggedIn: true,
      username: username,
      _id: _id
    })
  }
  logOut(message, type){
    this.showAlert(message, type)
    this.setState({
      isLoggedIn: false,
      username: '',
      _id: ''
    })
  }
  render() {
    return (
    	<BrowserRouter>
        	<div className="App container-fluid">
	        	<Navbar {...this.state} logOut={this.logOut} />
            <Alert {...this.state} />
	        	<Switch>
	        		<PrivateRoute {...this.state} exact path="/groups" 
                render={() => <GroupList {...this.state} /> } />
	        		<PrivateRoute {...this.state} path='/groups/new' 
                render={() => <AddGroup {...this.state} /> } />
	        		<PrivateRoute {...this.state} exact path={`/groups/:group_id`}
                render={({match}) => <Group {...this.state} match={match} /> } />
              <PrivateRoute {...this.state} exact path={`/groups/:group_id/items`}
                render={({match}) => <ItemList {...this.state} match={match} /> } />
              <PrivateRoute {...this.state} path={`/groups/:group_id/items/new`}
                render={({match}) => <AddItem {...this.state} match={match} /> } />
              <PrivateRoute {...this.state} exact path={`/groups/:group_id/items/:item_id`}
                render={({match}) => <Item {...this.state} match={match} /> } />
              <PrivateRoute {...this.state} path='/logout'
                render={() => <Logout {...this.state} logOut={this.logOut} showAlert={this.showAlert} />} />
	        		<NotLoggedRoute {...this.state} path="/(|login)/"
                render={() => <Login {...this.state} logIn={this.logIn} showAlert={this.showAlert} />} />
	        		<NotLoggedRoute {...this.state} path='/register'
                render={() => <Register {...this.state} logIn={this.logIn} showAlert={this.showAlert} />} />
	        	</Switch>
	        </div>
     	</BrowserRouter>
    );
  }
}

export default App;