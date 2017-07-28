import React, {Component} from 'react';

class GoogleMap extends Component {
  setMapRef = (mapRef)=>{
    this.mapRef = mapRef;
  }
  componentDidMount(){
  if(window.google){
    this.map = new window.google.maps.Map(this.mapRef,{
      zoom:12,
      center: this.props.center
    });
    this.marker = new window.google.maps.Marker({
    map: this.map,
    position: this.props.center
  });


  }
  }
  componentDidUpdate(prevProps, prevState){
    if (prevProps.center !== this.props.center) {
      this.map.panTo(this.props.center);
      this.marker.setPosition(this.props.center)
    }
  }
  render(){
    var mapSidelength = this.props.size || 300;
  return(  <div className="map" ref={this.setMapRef} style={{width:'100%',height:mapSidelength,maxWidth:mapSidelength,margin:'auto'}}></div>)
  }
}
export default GoogleMap;
