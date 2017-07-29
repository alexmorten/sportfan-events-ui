import React from 'react';
import Component from './helperComponents/Component';
import AuthComponent from './helperComponents/AuthComponent';
import AuthStore from './services/AuthStore';
import QueryFilter from './helperComponents/QueryFilter';
import {Link} from 'react-router-dom';
import SingleSelect from './helperComponents/SingleSelect';
import Paper from 'material-ui/Paper';
import './css/Administration.css';
import Divider from 'material-ui/Divider';
class UserList extends Component{
  state={
    users:[],
    filter:{
      query:"",
      status:"verified"
    }
  }
  getUsers = (filter=this.state.filter)=>{
    AuthStore.query("users",filter,(users)=>{
      this.setStateSafely({users:users});
    },(failResponse)=>{
      console.log(failResponse);
    })
  }
  onFilterChange = (e)=>{
    e.preventDefault();
    var filterCopy = Object.assign({},this.state.filter);
    filterCopy[e.target.name] = e.target.value;
    this.setStateSafely({filter:filterCopy});
    this.getUsers(filterCopy);
    console.log(filterCopy);
  }
  componentDidMount(){
    this.getUsers();
  }

  render(){
    console.log(this.state.filter.query);
    var userItems = this.state.users.map((user)=>{
      return(
        <div key={user.id}>
          <Divider/>
          <Link to={`/vereine/${user.id}`} key={user.id} style={{padding:'10px 0'}}>{user.name}</Link>
        </div>
      )
    });
    return(
      <Paper className="administration-user-list">
        <QueryFilter name="query" query={this.state.filter.query} onChange={this.onFilterChange} />
        <SingleSelect
          name="status"
          selected={this.state.filter.status}
          options={[{value:"normal",label:"Normal"},{value:"verified",label:"Verified"},{value:"admin",label:"Admin"}]}
          onChange={this.onFilterChange}
          />
        <div className="administration-user-list-users">
          {userItems}
        </div>
      </Paper>
    )
  }
}

class Administration extends AuthComponent{
  componentDidMount(){
    if(!(AuthStore.isAuthenticated() && AuthStore.getCurrentUserDetails().status === "admin")){
      this.transitionToLogin();
    }
  }
  render(){
    return(
      <UserList/>
    )
  }
}
export default Administration;
