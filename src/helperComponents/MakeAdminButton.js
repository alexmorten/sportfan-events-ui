import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AuthStore from '../services/AuthStore';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from './Toggle';
import VerifyButton from './VerifyButton';

class MakeAdminButton extends VerifyButton{
  onClick = ()=>{
    var user = this.props.user;
      this.setStateSafely({loading:true,failed:false,success:true});
    AuthStore.update(`users/${user.id}`,{status:"admin"},()=>{
      this.setStateSafely({loading:false,success:true});
        this.refresh();
    },(failResponse)=>{
      this.setStateSafely({loading:false,failed:true});
        this.refresh();
    })
  }
  buttonDisabled = ()=>{
    return (this.props.user.status === "admin") || this.state.loading
  }
render(){
  return(
    <div style={{display:"inline-block",margin:10}}>
      <RaisedButton onClick={this.onClick} disabled={this.buttonDisabled()} backgroundColor={this.buttonBackground()}>zum Admin machen</RaisedButton>
      <Toggle toggle={this.state.loading}>
        <LinearProgress/>
      </Toggle>
    </div>
  )
}
}
export default MakeAdminButton;
