import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import UserInput from './UserInput/UserInput.js';
import UserOutput from './UserOutput/UserOutput.js';

class App extends Component {
  state ={
    username:"DM"
  }
  usernameChangedHandler =(event)=>{
    this.setState({username:event.target.value});
  }
  render() {
    return (
    <div className="App">
      <UserInput 
        changed={this.usernameChangedHandler}
        currentName={this.state.username}
      />
      <UserOutput userName={this.state.username}/>
      <UserOutput userName="Max"/>
      <UserOutput userName="Max"/>
    </div>
    )
  }
}
export default App;

