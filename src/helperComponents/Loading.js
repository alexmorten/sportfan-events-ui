import React, {Component} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import '../css/Loading.css';
class Loading extends Component{
  render(){
    return(
      <div className="loading">
        <RefreshIndicator status="loading" size={40} top={0} left={0} style={{position:"relative"}}/>
      </div>
    );
  }
}
export default Loading;
