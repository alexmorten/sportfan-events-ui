import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import {NavLink,withRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AuthStore from './services/AuthStore';
import IfAdmin from './helperComponents/IfAdmin';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
class App extends Component {
  state={
    openDrawer:false
  }
  handleLogout = ()=>{
    AuthStore.deauthenticate();
    this.props.history.push("/");
    this.props.history.goForward();

    this.forceUpdate();
    }
    handleToggleDrawer=()=>{
      this.setState({openDrawer:!this.state.openDrawer});
    }
    handleCloseDrawer=()=>{
      this.setState({openDrawer:false});
    }
  render() {
    var loginLink=(
        <li className="nav-item login-link"><NavLink activeClassName="link-active" to="/login">Login</NavLink></li>
    );
    if(AuthStore.isAuthenticated()){
      loginLink=(
        <li className="nav-item login-link"><a onClick={this.handleLogout}>Logout</a></li>
      )
    }
    var menuItemStyle={
      color:"white",
      textAlign:"left",
      // fontSize:"15px",
      margin:"0",
      // lineHeight:"15px",
      // minHeight:"30px"
    }
    return (
      <MuiThemeProvider>

      <div className="app">
        <div className="app-header-container">
          <div className="app-header">
            <div className="app-header-logo-container" onClick={this.handleToggleDrawer}><img src={logo} className="App-logo" alt="logo" /></div>

            <ul className="navbar">
              <li className="nav-item"><NavLink exact={true} activeClassName="link-active" to="/">Events</NavLink></li>
              <li className="nav-item"><NavLink exact={true} activeClassName="link-active" to="/vereine">Vereine</NavLink></li>
              <IfAdmin style={{display:'inline-block'}}>
                <li className="nav-item"><NavLink exact={true} activeClassName="link-active" to="/administration">Administration</NavLink></li>
              </IfAdmin>
              {loginLink}
            </ul>
          </div>

        </div>
        <div className="app-body">
            {this.props.children}
        </div>
        <div className="app-footer">

        </div>
        <Drawer
          style={{
            top:"40px",
            color:"white"
          }}
          containerStyle={{
            backgroundColor:"#222",
            color:"white"
          }}
          docked={false}
          width={200}
          open={this.state.openDrawer}
          onRequestChange={(open) => this.setState({openDrawer:open})}>


          <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Prog. Languages</MenuItem>
          <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Databases</MenuItem>
          <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Tools & OS</MenuItem>
          <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >DevOps</MenuItem>
          <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Math & Algorithms</MenuItem>
          <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Computer Architecture</MenuItem>
          <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Planning & QA</MenuItem>
          <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Collaboration</MenuItem>
          <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >Did I forget something?</MenuItem>

        </Drawer>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
