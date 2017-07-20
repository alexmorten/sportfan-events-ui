import React, {Component} from 'react';
import '../css/LocationFormHelper.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class LocationFormHelper extends Component{
  state={
    address:"",
    lat:null,
    lng:null
  }
  setMapElement = (element)=>{
    this.mapElement=element;
  }
  onAddressChange = (e)=>{
    e.preventDefault();
    this.setState({address:e.target.value});
  }
  setLocation = (latLng)=>{
    var location = {lat:latLng.lat(),lng:latLng.lng()}
    this.setState(location);
    this.props.onLocationChange(location);
  }
  codeAddress = (e) => {
    e.preventDefault();
    var address =this.state.address;
    this.geocoder.geocode( { 'address': address}, (results, status)=> {
      if (status == 'OK') {
        this.map.setCenter(results[0].geometry.location);
        console.log(results);
        this.setLocation(results[0].geometry.location)
        this.marker.setPosition(results[0].geometry.location)
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  codeLocation = (event)=>{
    var latLng = event.latLng;
    this.setLocation(latLng);
    this.geocoder.geocode({location:latLng},(results,status)=>{
      if(status == "OK"){
        if(results[1]){
          this.setState({address:results[1].formatted_address})
        }else{
          alert('No results found')
        }
      }else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  componentDidMount(){
    if(window.google){
      var emsdetten ={lat:52.168805, lng:7.530960}
      this.geocoder = new window.google.maps.Geocoder();
      this.map = new window.google.maps.Map(this.mapElement,{
        center:emsdetten,
        zoom:13
      });
      this.marker = new window.google.maps.Marker({
        map:this.map,
        position:emsdetten,
        draggable:true
      });
      this.marker.addListener('dragend',this.codeLocation);

    }
  }
  render(){
    return(
      <div>
        <TextField name="address" floatingLabelText="Addresse" type="text" value={this.state.address} onChange={this.onAddressChange} fullWidth={true}/>
        <FlatButton onClick={this.codeAddress}>Finden!</FlatButton>
        <div className="location-form-map" ref={this.setMapElement}></div>
      </div>
    )
  }
}
export default LocationFormHelper;
