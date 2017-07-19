import React,{Component} from 'react';

class DistHelper extends Component{
render(){
  var dist = Math.round(this.props.dist*100)/100;
  return (
    <span className={this.props.className}>{dist ? dist+" km entfernt" : ""}</span>
  )
}
}

export default DistHelper;
