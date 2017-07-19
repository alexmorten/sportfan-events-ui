import React, { Component } from 'react';
import './css/Event.css';
import Paper from 'material-ui/Paper';
import DateDifference from './helperComponents/DateDifference';
import DistHelper from './helperComponents/DistHelper';
import UserHelper from './helperComponents/UserHelper';
import GroupHelper from './helperComponents/GroupHelper';

class Event extends Component {
  render(){
    var event = this.props.event;
    var paperStyle = {
      display:'inline-block',
      padding:'0 20px',
      width:'100%',
      maxWidth:'600px',
      margin:'0 auto'
    }
    return(
      <Paper style={paperStyle}>
        <div className="event-info-bar">
          <DateDifference date={event.date} className="event-time"/>
          <DistHelper dist={event.dist} className="event-dist"/>
        </div>
        <div className="event-references">
          <GroupHelper group={event.group}/>
          <UserHelper user={event.user} />
        </div>
        <h4 className="event-title">{event.title}</h4>
        <p>{event.description}</p>
      </Paper>
    );
  }
}
export default Event;
