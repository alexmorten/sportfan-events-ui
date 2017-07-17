import React, { Component } from 'react';
import './css/Event.css';
import {Link} from 'react-router-dom';
import Store from './services/Store';
import AuthComponent from './helperComponents/AuthComponent';
import Paper from 'material-ui/Paper';
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

        </div>
        <h4>{event.title}</h4>
        <p>{event.description}</p>
      </Paper>
    );
  }
}
export default Event;
