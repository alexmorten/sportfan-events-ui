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
    this.setState();
    }
  render() {
    var loginLink=(
        <li className="nav-item"><Link to="/login">Login</Link></li>
    );
    if(AuthStore.isAuthenticated()){
      loginLink=(
        <li className="nav-item"><a onClick={this.handleLogout}>Logout</a></li>
      )
    }
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    return (
      <MuiThemeProvider>

      <div className="App">
        
        <div className="App-header">
          <div><img src={logo} className="App-logo" alt="logo" /></div>

          <ul className="navbar">
            <li className="nav-item"><Link to="/">Events</Link></li>
            <li className="nav-item"><Link to="/vereine">Vereine</Link></li>
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
