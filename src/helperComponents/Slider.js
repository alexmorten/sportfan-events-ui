import React , {Component} from 'react';
import '../css/Slider.css';
class Slider extends Component{
  render(){
    return(
      <div className={"slider-container"+ (this.props.open ? " open":"")}>
        {this.props.children}
      </div>
  );
  }
}
export default Slider;
