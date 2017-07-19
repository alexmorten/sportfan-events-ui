import React,{Component} from 'react';
import '../css/GroupHelper.css';

class GroupHelper extends Component{
  render(){
    var group = this.props.group;
    if(!group){
      return(<span></span>)
    }
    return(
      <span className="group-helper-container">
       {group.name} -{" "}
      </span>
    );
  }
}
export default GroupHelper;
