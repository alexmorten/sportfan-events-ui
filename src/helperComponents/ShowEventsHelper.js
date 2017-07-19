import React, {Component } from 'react';
import Store from '../services/Store';
import Action from './Action';
import '../css/ShowEventsHelper.css';
import Event from '../Event';
import Loading from './Loading';

class ShowEventsHelper extends Component{
  state={
    open:false,
    loaded:false,
    events:[]
  }
  getEvents = ()=>{
    var url = this.props.dataUrl;
    Store.receive(url,(events)=>{
      this.setState({events:events,loaded:true});
    },(failResponse)=>{
      console.log(failResponse);
    })
  }
  open = (e)=>{
    this.setState({open:true});
    this.getEvents();
  }
  close = (e)=>{
    this.setState({open:false});
  }
  render(){
    var loadingIndicator = (<div></div>);
    if(!this.state.loaded){
      loadingIndicator= (<Loading/>);
    }
    if(!this.state.open){
      if(this.props.event_count > 0){
        return(
          <Action onClick={this.open}>{this.props.event_count} Events</Action>
        );
      }else{
        return (<div></div>)
      }


    }else{
      var eventItems = this.state.events.map((event)=>{
        return(  <Event key={event.id} event={event}/>)
      })
      return(
        <div className="show-events-container">
          <Action onClick={this.close}>weniger Anzeigen</Action>
          <div className="show-events">
            {eventItems}
          </div>
          {loadingIndicator}
        </div>
      )
    }
  }
}
export default ShowEventsHelper;
