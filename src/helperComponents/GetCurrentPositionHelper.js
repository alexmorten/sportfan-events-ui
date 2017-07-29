import React from 'react';
import Component from './Component';
import Geo from '../services/Geo';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from './Toggle';
import FontIcon from 'material-ui/FontIcon';
import '../css/GetCurrentPositionHelper.css';
class GetCurrentPositionHelper extends Component{
state={
  loading:false,
  finished:false,
  error:""
}
onClick = (e)=>{
  e.preventDefault();
  this.getPosition();
}
getPosition = ()=>{
  this.setStateSafely({loading:true});
  Geo.getLocation((pos)=>{
    this.props.onSubmit({lat:pos.latitude,lng:pos.longitude});
    this.setStateSafely({finished:true,loading:false});
  },(error)=>{
    console.log(error);
  });
}
componentDidMount(){
  if(!this.props.disabledDirectLocate){
    Geo.ifGranted(this.getPosition);
  }
}
componentWillMount(){

}
  render(){
    return(
    <div className={this.props.className+" get-current-position"}>
      <FlatButton onClick={this.onClick} disabled={this.state.loading}> Mich orten!</FlatButton>
      <Toggle toggle={this.state.finished} className="get-current-position-check">
        <FontIcon className="material-icons">check</FontIcon>
      </Toggle>
      <Toggle toggle={this.state.loading} className="get-current-position-loading">
        <LinearProgress/>
      </Toggle>

    </div>
  )
  }
}
export default GetCurrentPositionHelper;
