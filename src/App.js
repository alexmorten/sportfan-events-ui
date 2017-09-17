import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import {NavLink,withRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AuthStore from './services/AuthStore';
import IfAdmin from './helperComponents/IfAdmin';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IfVerified from './helperComponents/IfVerified';
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
        <span className="nav-item login-link"><a onClick={this.handleLogout}>Logout</a></span>
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
    var userDetails=AuthStore.getCurrentUserDetails() || {};
    var userID = userDetails.id;
    return (
      <MuiThemeProvider>

      <div className="app">
        <div className="app-header-container">
          <div className="app-header">
            <div className="app-header-logo-container" onClick={this.handleToggleDrawer}><img src={logo} className="App-logo" alt="logo" /></div>


              {loginLink}
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


          <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >
            <NavLink exact={true} activeClassName="link-active" to="/">Events</NavLink>
          </MenuItem>
          <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >
            <IfVerified>
              <NavLink exact={true} activeClassName="link-active" to={`/vereine/${userID}`}>Mein Verein</NavLink>
            </IfVerified>
          </MenuItem>
          <MenuItem onClick={this.handleToggleDrawer} style={menuItemStyle} >
            <IfAdmin >
              <NavLink exact={true} activeClassName="link-active" to="/administration">Administration</NavLink>
            </IfAdmin>
          </MenuItem>


        </Drawer>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
