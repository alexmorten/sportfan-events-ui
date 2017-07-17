import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AuthStore from './services/AuthStore';

class App extends Component {
  handleLogout = (e)=>{
    //e.preventDefault();
    AuthStore.deauthenticate();
    }
  render() {
    var loginLink=(
        <li className="nav-item"><Link to="/login" onClick={this.handleLogout}>{AuthStore.isAuthenticated() ? "Logout" : "Login"}</Link></li>
    );
    // if(Store.isAuthenticated()){
    //   loginLink=(
    //     <li className="nav-item"><a onClick={this.handleLogout}>Logout</a></li>
    //   )
    // }
    return (
      <MuiThemeProvider>

      <div className="App">

        <div className="App-header">
          <div><img src={logo} className="App-logo" alt="logo" /></div>

          <ul className="navbar">
            <li className="nav-item"><Link to="/">Events</Link></li>

            {loginLink}
          </ul>
        </div>
            {this.props.children}
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
