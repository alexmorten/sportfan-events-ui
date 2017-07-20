import React, {Component} from 'react';

class GoogleMap extends Component {
  setMapRef = (mapRef)=>{
    this.mapRef = mapRef;
  }
  componentDidMount(){
  if(window.google){
    this.map = new window.google.maps.Map(this.mapRef,{
      zoom:8,
      center: this.props.center
    });
    this.marker = new window.google.maps.Marker({
    map: this.map,
    position: this.props.center,
    draggable:true
  });
  var dragFunc = (event)=>{
    console.log(event.latLng.lat());
    console.log(event);
  }
  this.marker.addListener("drag",dragFunc);
  this.marker.addListener("dragend",dragFunc);
  }
  console.log(this.marker);
  }
  render(){
  return(  <div className="map" ref={this.setMapRef} style={{width:'100%',height:'500px'}}></div>)
  }
}
export default GoogleMap;
