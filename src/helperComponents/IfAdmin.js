import React ,{Component} from "react";
import AuthStore from '../services/AuthStore';

class IfAdmin extends Component {
  render(){
    var user = this.props.user;
    var currentUser = AuthStore.getCurrentUserDetails();
    if( (currentUser && currentUser.status === "admin") || (user && currentUser && user.id === currentUser.id)){
      return(
        <div>
          {this.props.children}
        </div>
      )
    }else{
      return(<div></div>)
    }
  }
}
export default IfAdmin;
