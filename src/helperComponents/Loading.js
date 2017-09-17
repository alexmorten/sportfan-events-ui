import React, {Component} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import '../css/Loading.css';
class Loading extends Component{
  render(){
    var type= this.props.type || "fixed";
    return(
      <div className={type==="fixed" ? "loading-fixed": "loading-static"} style={ type === "fixed" ? {position:"fixed"} : {position:"static"}}>
        <RefreshIndicator status="loading" size={40} top={0} left={0} style={{position:"relative"}}/>
      </div>
    );
  }
}
export default Loading;
