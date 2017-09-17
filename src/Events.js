import React from 'react';
import Component from './helperComponents/Component';
import './css/Events.css';
import {Link} from 'react-router-dom';
import Store from './services/Store';
import IfVerified from './helperComponents/IfVerified';
import Event from './Event';
import RaisedButton from 'material-ui/RaisedButton';
import EventFilterBar from './helperComponents/EventFilterBar';
import Subheader from './helperComponents/Subheader';
import Left from './helperComponents/Left';
import Right from './helperComponents/Right';

class Events extends Component{
  state={
    events:[],
    filter:{}
  }
  getEvents = (filter=this.state.filter)=>{
      Store.query("events",filter,(events)=>{
          this.setStateSafely({events:events});
        },(failResponse)=>{
          console.log(failResponse);
        },false);
  }

  componentDidMount(){
    this.getEvents();
  }
  onFilterChange = (filter)=>{
    this.setStateSafely({filter:filter});
    this.getEvents(filter);
  }

render(){
  var eventItems = this.state.events.map((event)=>{
    return ( <Event key={event.id} event={event}/>);
  });

  return(
    <div>
      <Subheader>
        <Right>
          <IfVerified>
            <Link to="neu" >
              <RaisedButton primary={true} label="Event Hinzufügen"/>
            </Link>
          </IfVerified>
        </Right>
      </Subheader>

      <EventFilterBar onFilterChange={this.onFilterChange}/>
      <div className="events-events">
      {eventItems}
      </div>
    </div>
  );
}
}
export default Events;
