import React, {Component} from 'react';

class Toggle extends Component {
  render(){
    if(this.props.toggle){
      return(<div>{this.props.children}</div>)
    }else{
      return(<div></div>)
    }
  }
}
export default Toggle;
