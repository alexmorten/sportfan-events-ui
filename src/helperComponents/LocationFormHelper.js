import React from 'react';
import Component from './Component';
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
    this.setStateSafely({center:location});
    this.props.onLocationChange(location);
  }
  setLocation = (latLng)=>{
    var location = {lat:latLng.lat(),lng:latLng.lng()}
    this.setCoords(location.lat,location.lng);
  }
  goToLocation = (location) =>{
    this.setCoords(location.lat,location.lng);
    //this.setStateSafely({mapOpen:true});
  }
  toggleMap=()=>{
    this.setStateSafely({mapOpen: !this.state.mapOpen});
  }
  render(){
    return(
      <div>
      <div className="location-form-helper-flex">
        {/* <TextField name="address" floatingLabelText="Addresse" type="text" value={this.state.address} onChange={this.onAddressChange} fullWidth={true}/> */}
        <div className="">
        <GooglePlaceAutocomplete
          floatingLabelText="Addresse"
          // value="5"
        	// Function to return lat and lng
          style={{width:"270px"}}
        	results={this.setCoords}
        />
        <span className="latlng"> {this.state.center.lat} , {this.state.center.lng}</span>

        </div>
        <div className="">
          <GetCurrentPositionHelper onSubmit={this.goToLocation} className="current-location"/>
        <br/>
        <FlatButton onClick={this.toggleMap}>Karte {this.state.mapOpen ? "verstecken" : "anzeigen"}</FlatButton>
        </div>
      </div>

        <Toggle toggle={this.state.mapOpen}>
          <GoogleMap center={this.state.center}/>
        </Toggle>
        </div>
    )
  }
}
export default LocationFormHelper;
