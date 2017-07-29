import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import {NavLink} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AuthStore from './services/AuthStore';
import IfAdmin from './helperComponents/IfAdmin';
class App extends Component {
  handleLogout = ()=>{
    AuthStore.deauthenticate();
    this.forceUpdate();
    }

  render() {
    var loginLink=(
        <li className="nav-item"><NavLink activeClassName="link-active" to="/login">Login</NavLink></li>
    );
    if(AuthStore.isAuthenticated()){
      loginLink=(
        <li className="nav-item"><a onClick={this.handleLogout}>Logout</a></li>
      )
    }
    return (
      <MuiThemeProvider>

      <div className="app">
        <div className="app-header-container">
          <div className="app-header">
            <div className="app-header-logo-container"><img src={logo} className="App-logo" alt="logo" /></div>

            <ul className="navbar">
              <li className="nav-item"><NavLink exact={true} activeClassName="link-active" to="/">Events</NavLink></li>
              <li className="nav-item"><NavLink exact={true} activeClassName="link-active" to="/vereine">Vereine</NavLink></li>
              <IfAdmin style={{display:'inline-block'}}>
                <li className="nav-item"><NavLink exact={true} activeClassName="link-active" to="/administration">Administration</NavLink></li>
              </IfAdmin>
              {loginLink}
            </ul>
          </div>
          <div className="app-header-blur"></div>
        </div>
        <div className="app-body">
            {this.props.children}
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
