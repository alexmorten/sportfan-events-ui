import React, {Component} from 'react';

class Toggle extends Component {
  render(){
    if(this.props.toggle){
      return(<div className={this.props.className}>{this.props.children}</div>)
    }else{
      return(<div className={this.props.className}></div>)
    }
  }
}
export default Toggle;
