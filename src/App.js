import React, { Component } from 'react';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import QA from './components/QA/QA';



class App extends Component {
  constructor() {
    super();
    // var results = localStorage.getItem("results");
    var crrUser = JSON.parse(localStorage.getItem("crrUser"));
    this.state = {
      login: crrUser ? true : false,
      credentials: true,
      crrUser
    }
    
  }

  NotHaveCred() {
    this.setState({
      credentials: false,
    })
  }

  HaveCred() {
    this.setState({
      credentials: true,
    })
  }

  

  render() {
    const { login, credentials } = this.state;
    return (
      <div>
        {!login && credentials && <Login NotHaveCred={() => this.NotHaveCred()} />}
        {!login && !credentials && <SignUp HaveCred={() => this.HaveCred()}/>}
        {login && <QA/>}


        

      </div>
    );
  }
}

export default App;
