import React , {Component} from 'react';
import {Link} from 'react-router-dom';

class UserHelper extends Component{
render(){
  var user = this.props.user;
  if(user){
    return(
      <span><Link to={"/vereine/"+user.id}>{user.name}</Link></span>
    );
  }
  return (
    <div></div>
  )
}
}
export default UserHelper;
