import React, { Component } from 'react';
import './css/Events.css';
import {Link} from 'react-router-dom';
import Store from './services/Store';
import IfVerified from './helperComponents/IfVerified';
import Event from './Event';
import RaisedButton from 'material-ui/RaisedButton';
import PositionGetter from './helperComponents/PositionGetter';

class Events extends Component{
  state={
    events:[],
    lat:null,
    lng:null
  }
  getEvents = (lat=this.state.lat,lng=this.state.lng)=>{
    if(lat && lng){
      Store.query("events",{lat:lat,lng:lat},(events)=>{
          this.setState({events:events});
        },(failResponse)=>{
          console.log(failResponse);
        })
    }else{
      Store.receive("events",(events)=>{
          this.setState({events:events});
        },(failResponse)=>{
          console.log(failResponse);
        });
    }
  }

  componentDidMount(){
    this.getEvents();
  }
  onPositionChange=(pos)=>{
    this.setState(pos);
    this.getEvents(pos.lat,pos.lng);
  }
render(){
  var eventItems = this.state.events.map((event)=>{
    return ( <Event key={event.id} event={event}/>);
  });
  var newButtonStyle={
    margin:'20px'
  }
  return(
    <div>
      <h4>Events</h4>
      <IfVerified>
        <Link to="new" >
          <RaisedButton primary={true} label="Event Hinzufügen" style={newButtonStyle}/>
        </Link>
      </IfVerified>
      <div>
        <PositionGetter onChange={this.onPositionChange}/>
      </div>
      {eventItems}
    </div>
  );
}
}
export default Events;
