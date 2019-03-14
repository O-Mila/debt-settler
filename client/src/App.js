import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Groups from './components/group/Groups';
import AddGroup from './components/addGroup/AddGroup';
import AddItem from './components/addItem/AddItem';
import Item from './components/item/Item';
import TransactionList from './components/transactions/TransactionList';
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
      user_id: '',
      index: 0,
      alert: {
        message: '',
        type: ''
      }
  	}
  	this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.showAlert = this.showAlert.bind(this)
    this.changeGroup = this.changeGroup.bind(this)
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
  logIn(username, user_id, message, type){
    this.showAlert(message, type)
    this.setState({
      isLoggedIn: true,
      username: username,
      user_id: user_id
    })
  }
  logOut(message, type){
    this.showAlert(message, type)
    this.setState({
      isLoggedIn: false,
      username: '',
      user_id: '',
      index: 0
    })
  }
  changeGroup = (index) => {
    this.setState({ index: index })
  }
  render() {
    return (
    	<BrowserRouter>
        	<div className="App container-fluid">
	        	<Navbar {...this.state} logOut={this.logOut} />
            <Alert {...this.state} />
	        	<Switch>
	        		<PrivateRoute {...this.state} exact path="/groups" 
                render={() => <Groups {...this.state} changeGroup={this.changeGroup} /> } />

	        		<PrivateRoute {...this.state} path="/groups/new" render={() => 
                <AddGroup {...this.state} showAlert={this.showAlert} 
                changeGroup={this.changeGroup} /> } />
              
              <PrivateRoute {...this.state} path={`/groups/:group_id/items/new`}
                render={({match}) => <AddItem {...this.state} match={match} /> } />
              
              <PrivateRoute {...this.state} exact path={`/groups/:group_id/items/:item_id`}
                render={({match}) => <Item {...this.state} match={match} /> } />
              
              <PrivateRoute {...this.state} exact path={`/groups/:group_id/items`}
                render={({match}) => <TransactionList {...this.state} match={match} /> } />

              <PrivateRoute {...this.state} path="/logout"
                render={() => <Logout {...this.state} logOut={this.logOut} 
                showAlert={this.showAlert} />} />
	        		
              <NotLoggedRoute {...this.state} path="/(|login)/"
                render={() => <Login {...this.state} logIn={this.logIn} 
                showAlert={this.showAlert} />} />
	        		
              <NotLoggedRoute {...this.state} path="/register"
                render={() => <Register {...this.state} logIn={this.logIn} 
                showAlert={this.showAlert} />} />
	        	</Switch>
	        </div>
     	</BrowserRouter>
    );
  }
}

export default App;