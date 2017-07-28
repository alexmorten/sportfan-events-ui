import React , {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AuthStore from '../services/AuthStore';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from './Toggle';
class VerifyButton extends Component{
  state={
    loading:false,
    failed:false,
    success:false
  }
  onClick = ()=>{
    var user = this.props.user;
      this.setState({loading:true,failed:false,success:true});
    AuthStore.update(`users/${user.id}`,{status:"verified"},()=>{
      this.setState({loading:false,success:true});
      this.refresh();
    },(failResponse)=>{
      this.setState({loading:false,failed:true});
      this.refresh();
    })
  }
  refresh = ()=>{
    if(this.props.refresh){
      this.props.refresh();
    }
  }
  buttonDisabled = ()=>{
    return (this.props.user.status !== "normal") || this.state.loading
  }
  buttonBackground = ()=>{
    if(this.state.failed){
      return "red";
    }
    if(this.state.success){
      return "#009e00";
    }
    return ""
  }
  render(){
    return(
      <div style={{display:"inline-block",margin:10}}>
        <RaisedButton onClick={this.onClick} disabled={this.buttonDisabled()} backgroundColor={this.buttonBackground()}>verifizieren</RaisedButton>
        <Toggle toggle={this.state.loading}>
          <LinearProgress/>
        </Toggle>
      </div>
    );
  }
}
export default VerifyButton;
