import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AuthStore from '../services/AuthStore';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from './Toggle';
import VerifyButton from './VerifyButton';

class UnverifyButton extends VerifyButton{
  onClick = ()=>{
    var user = this.props.user;
      this.setStateSafely({loading:true,failed:false,success:true});
    AuthStore.update(`users/${user.id}`,{status:"normal"},()=>{
      this.setStateSafely({loading:false,success:true});
        this.refresh();
    },(failResponse)=>{
      this.setStateSafely({loading:false,failed:true});
        this.refresh();
    })
  }
  buttonDisabled = ()=>{
    return (this.props.user.status === "normal") || this.state.loading
  }
render(){
  return(
    <div style={{display:"inline-block",margin:10}}>
      <RaisedButton onClick={this.onClick} disabled={this.buttonDisabled()} backgroundColor={this.buttonBackground()}>de-verifizieren</RaisedButton>
      <Toggle toggle={this.state.loading}>
        <LinearProgress/>
      </Toggle>
    </div>
  )
}
}
export default UnverifyButton;
