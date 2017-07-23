import React,{Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import Action from './Action';
import '../css/ToggleForm.css';
class ToggleForm extends Component{
  onClick = ()=>{
    var value = !this.props.toggle;

    var fakeTarget = {
      name:this.props.name,
      value:value
    };
    var fakeEvent = {
      preventDefault:()=>{},
      target:fakeTarget
    };
    this.props.onClick(fakeEvent);
  }
  render(){
    var text = (<span className="toggle-form-text">{this.props.text}</span>)
    if(this.props.toggle){
      return(
        <div className="toggle-form">
          <Action onClick={this.onClick} ><FontIcon className="material-icons toggle-form-icon">check_box</FontIcon></Action> {text}
        </div>
      )
    }else{
      return(
        <div className="toggle-form">
          <Action onClick={this.onClick} ><FontIcon className="material-icons toggle-form-icon">check_box_outline_blank</FontIcon></Action> {text}
        </div>
      )
    }
  }
}
export default ToggleForm;
