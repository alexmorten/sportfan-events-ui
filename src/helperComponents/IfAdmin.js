import React ,{Component} from "react";
import AuthStore from '../services/AuthStore';

class IfAdmin extends Component {
  render(){
    var user = this.props.user;
    var currentUser = AuthStore.getCurrentUserDetails();
    if( (currentUser && currentUser.status === "admin") || (user && currentUser && user.id === currentUser.id)){
      return(
        <div style={this.props.style} className={this.props.className}>
          {this.props.children}
        </div>
      )
    }else{
      return(<div style={this.props.style} className={this.props.className}></div>)
    }
  }
}
export default IfAdmin;
