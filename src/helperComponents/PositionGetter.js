import '../css/PositionGetter.css';
import React, { Component} from 'react';
import TextField from 'material-ui/TextField';

class PositionGetter extends Component{
  state={
    lat:undefined,
    lng:undefined
  }
  onPositionChange=(e)=>{
    e.preventDefault();
    var position = {
      lat:this.state.lat,
      lng:this.state.lng
    };
    position[e.target.name]=e.target.value;
    this.setState(position);
    if(position.lat && position.lng){
      this.props.onChange(position);
    }

  }
  render(){
    return(
      <div>
        <TextField name="lat" floatingLabelText="Latitude" type="number" value={this.state.lat} onChange={this.onPositionChange} fullWidth={false}/>
        <TextField name="lng" floatingLabelText="Longitude" type="number" value={this.state.lng} onChange={this.onPositionChange} fullWidth={false}/>
      </div>
    );

  }
}
export default PositionGetter;
