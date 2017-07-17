import React, { Component } from 'react';
import './css/Events.css';
import {Link} from 'react-router-dom';
import Store from './services/Store';
import IfVerified from './helperComponents/IfVerified';
import Event from './Event';
import RaisedButton from 'material-ui/RaisedButton';
class Events extends Component{
  state={
    events:[]
  }
  getEvents = ()=>{
  Store.receive("events",(events)=>{
      this.setState({events:events});
    },(failResponse)=>{
      console.log(failResponse);
    })
  }
  componentDidMount(){
    this.getEvents();
  }
render(){
  var eventItems = this.state.events.map((event)=>{
    return ( <Event event={event}/>);
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
      {eventItems}
    </div>
  );
}
}
export default Events;
