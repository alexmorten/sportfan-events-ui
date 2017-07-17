import React,{Component} from 'react';
import AuthStore from '../services/AuthStore';

class IfVerified extends Component{
  render(){
    if(!AuthStore.isAuthenticated()){
      return (<div></div>)
    }
    var status = AuthStore.getCurrentUserDetails().status;
    if(status === "verified" || status === "admin"){
  
      return(
        <div>
          {this.props.children}
        </div>
      );
    }else{
      return (<div></div>);
    }

  }
}
export default IfVerified;
