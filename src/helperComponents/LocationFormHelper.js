import React, {Component} from 'react';
import '../css/LocationFormHelper.css';
import FlatButton from 'material-ui/FlatButton';
import GooglePlaceAutocomplete from 'material-ui-autocomplete-google-places';
import Toggle from './Toggle';
import GoogleMap from './GoogleMap';
import GetCurrentPositionHelper from './GetCurrentPositionHelper';
class LocationFormHelper extends Component{
  state={
    address:"",
    center:{lat:52.168805, lng:7.530960}, //emsdetten
    mapOpen:false
  }


  setCoords = (lat,lng)=>{
    var location = {lat:lat,lng:lng};
    this.setState({center:location,mapOpen:true});
    this.props.onLocationChange(location);
  }
  setLocation = (latLng)=>{
    var location = {lat:latLng.lat(),lng:latLng.lng()}
    this.setCoords(location.lat,location.lng);
  }
  goToLocation = (location) =>{
    this.setCoords(location.lat,location.lng);
    this.setState({mapOpen:true});
  }
  toggleMap=()=>{
    this.setState({mapOpen: !this.state.mapOpen});
  }
  render(){
    return(
      <div>
        {/* <TextField name="address" floatingLabelText="Addresse" type="text" value={this.state.address} onChange={this.onAddressChange} fullWidth={true}/> */}
        <GooglePlaceAutocomplete
          floatingLabelText="Addresse"
          // value="5"
        	// Function to return lat and lng
        	results={this.setCoords}
        />
        <FlatButton onClick={this.toggleMap}>Karte {this.state.mapOpen ? "verstecken" : "anzeigen"}</FlatButton>
        <span className="latlng"> {this.state.center.lat} , {this.state.center.lng}</span>
        <GetCurrentPositionHelper onSubmit={this.goToLocation} className="current-location"/>
        <Toggle toggle={this.state.mapOpen}>
          <GoogleMap center={this.state.center}/>
        </Toggle>
      </div>
    )
  }
}
export default LocationFormHelper;
