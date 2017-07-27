import React, { Component } from 'react';
import './css/Events.css';
import {Link} from 'react-router-dom';
import Store from './services/Store';
import IfVerified from './helperComponents/IfVerified';
import Event from './Event';
import RaisedButton from 'material-ui/RaisedButton';
import EventFilterBar from './helperComponents/EventFilterBar';
class Events extends Component{
  state={
    events:[],
    filter:{}
  }
  getEvents = (filter=this.state.filter)=>{
    console.log("getting events");
      Store.query("events",filter,(events)=>{
          this.setState({events:events});
        },(failResponse)=>{
          console.log(failResponse);
        },true)

  }

  componentDidMount(){
    this.getEvents();
  }
  onFilterChange = (filter)=>{
    this.setState({filter:filter});
    this.getEvents(filter);
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
      <IfVerified>
        <Link to="new" >
          <RaisedButton primary={true} label="Event Hinzufügen" style={newButtonStyle}/>
        </Link>
      </IfVerified>
      <EventFilterBar onFilterChange={this.onFilterChange}/>
      <div className="events-events">
      {eventItems}
      </div>
    </div>
  );
}
}
export default Events;
