import React , {Component} from 'react';
import '../css/Action.css'
class Action extends Component{
  onClick = (e)=>{
    e.preventDefault();
    this.props.onClick();
  }
  render(){
      return (
        <a className="action-container" onClick={this.onClick}>{this.props.children}</a>
      )
  }
}
export default Action;
