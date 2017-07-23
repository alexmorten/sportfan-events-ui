import React, {Component} from 'react';
import Geo from '../services/Geo';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from './Toggle';
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
  this.setState({loading:true});
  Geo.getLocation((pos)=>{
    this.props.onSubmit({lat:pos.latitude,lng:pos.longitude});
    this.setState({finished:true,loading:false});
  },(error)=>{
    console.log(error);
  });
}
componentDidMount(){
  if(!this.props.disabledDirectLocate){
    Geo.ifGranted(this.getPosition);
  }
}
  render(){
    return(
    <div className={this.props.className}>
      <FlatButton onClick={this.onClick}> Mich orten!</FlatButton>
      <Toggle toggle={this.state.loading}>
        <LinearProgress/>
      </Toggle>
    </div>
  )
  }
}
export default GetCurrentPositionHelper;
