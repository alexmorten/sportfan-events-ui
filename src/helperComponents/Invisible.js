import React , {Component} from 'react';
import '../css/Invisible.css';

class Invisible extends Component{
  render(){
    return(
      <div className={"invisible-container"+ (this.props.invisible ? " invisible":" visible")}>
        {this.props.children}
      </div>
    )
  }
}
export default Invisible;
