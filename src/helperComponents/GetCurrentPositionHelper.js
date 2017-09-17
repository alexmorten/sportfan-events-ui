import React from 'react';
import Component from './Component';
import Geo from '../services/Geo';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from './Toggle';
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
    var buttonText = "Mich orten!";
    var finished = this.state.finished;
    if(finished){
      buttonText = "geortet";
    }

    return(
    <div className={this.props.className+" get-current-position"}>
      <RaisedButton
        onClick={this.onClick}
        disabled={this.state.loading}
        backgroundColor={finished ? "green" : "lightblue"}
        label={buttonText}
        labelColor={"white"}/>

      <Toggle toggle={this.state.loading} className="get-current-position-loading">
        <LinearProgress/>
      </Toggle>

    </div>
  )
  }
}
export default GetCurrentPositionHelper;
