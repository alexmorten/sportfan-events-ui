import React , {Component} from 'react';
import Store from './services/Store';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router-dom';
import './css/Users.css';
class Users extends Component{
  state={
    users:[]
  }
  getUsers = ()=>{
    Store.receive("users",(users)=>{
      this.setState({users:users});
    },(failResponse)=>{
      console.log(failResponse);
    })
  }
  componentDidMount(){
    this.getUsers();
  }
  render(){
    // var paperStyle = {
    //   display:'inline-block',
    //   padding:'0 20px',
    //   width:'100%',
    //   maxWidth:'600px',
    //   margin:'0 auto'
    // }
    var userItems = this.state.users.map((user)=>{
      return (
        <Link to={"/vereine/"+user.id} key={user.id}>
          <Paper className="user-container">
            <h4>{user.name}</h4>
            <p>{user.description}</p>
          </Paper>
        </Link>
      )
    });
    return(
      <div className="users-container">
        {userItems}
      </div>
  );
  }
}
export default Users;
