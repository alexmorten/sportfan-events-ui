import React, { Component } from 'react';
import './css/Event.css';
import Paper from 'material-ui/Paper';
import DateDifference from './helperComponents/DateDifference';
import DistHelper from './helperComponents/DistHelper';
import UserHelper from './helperComponents/UserHelper';
import GroupHelper from './helperComponents/GroupHelper';
import Tag from './helperComponents/Tag';
import {Link} from 'react-router-dom';
class Event extends Component {
  render(){
    var event = this.props.event;
    var paperStyle = {
      padding:'5px 20px',
      width:'100%',
      maxWidth:'800px',
      margin:'5px auto'
    }

    var tagItems = event.tags.map((tag)=>{
        return <Tag key={tag.id} tag={tag}/>
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
        <Link to={`/events/${event.id}`}>
          <h4 className="event-title">{event.title}</h4>
          <p className="event-description">{event.description}</p>
        </Link>
      </Paper>
    );
  }
}
export default Event;
