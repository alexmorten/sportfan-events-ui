import React, {Component} from 'react';

class AddressDisplay extends Component{
  state={
    address:""
  }
  getAdress = ()=>{
     var geocoder = new window.google.maps.Geocoder();
     var location = this.props.location;
     geocoder.geocode({location:location},(results, status)=>{
       if(status==='OK' && results[0]){
         this.setState({address:results[0].formatted_address,language:"de"})
       }
     });
  }
  componentDidMount(){
    this.getAdress();
  }
  render(){
    var items;
    if(this.state.address){
      var formated = this.state.address.split(',');
       items = formated.map((word,i)=>{
        return <span key={i} style={{display:'block'}}>{word}</span>
      });

    }
    return(  <p style={{margin:"0"}}>{items}</p>)


  }
}
export default AddressDisplay;
