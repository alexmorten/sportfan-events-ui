import React, { Component } from 'react';
import './css/Event.css';
import Paper from 'material-ui/Paper';
import DateDifference from './helperComponents/DateDifference';
import DistHelper from './helperComponents/DistHelper';
import UserHelper from './helperComponents/UserHelper';
import GroupHelper from './helperComponents/GroupHelper';
import Chip from 'material-ui/Chip';
import {blue200} from 'material-ui/styles/colors';
// import GoogleMap from './helperComponents/GoogleMap';
class Event extends Component {
  render(){
    var event = this.props.event;
    var paperStyle = {
      // display:'inline-block',
      padding:'5px 20px',
      width:'100%',
      maxWidth:'800px',
      margin:'5px auto'
    }
      // console.log(event);
      // console.log(event.tags);
    var tagItems = event.tags.map((tag)=>{
        return <Chip className="event-tag-chip" style={{margin:4,display:"inline-block",position:"static"}} backgroundColor={blue200}>{tag.name}</Chip>
    });
    return(
      <Paper style={paperStyle}>

        <div className="event-info-bar">
          <DateDifference date={event.date} className="event-time"/>
          <DistHelper dist={event.dist} className="event-dist"/>
        </div>
        <div className="event-tag-bar">
          {tagItems}
        </div>
        <div className="event-references">
          <GroupHelper group={event.group}/>
          <UserHelper user={event.user} />
        </div>

        <h4 className="event-title">{event.title}</h4>
        <p>{event.description}</p>
        {/* <GoogleMap center={{lat:event.lat,lng:event.lng}}/> */}
      </Paper>
    );
  }
}
export default Event;
