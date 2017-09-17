import React from 'react';
import Component from './Component';
import Store from '../services/Store';
import Action from './Action';
import '../css/ShowEventsHelper.css';
import Event from '../Event';
import Loading from './Loading';
import Divider from 'material-ui/Divider';
import EventFilterBar from './EventFilterBar';
class ShowEventsHelper extends Component{
  state={
    open:false,
    loaded:false,
    events:[],
    filter:{}
  }
  getEvents = (filter=this.state.filter)=>{
    var url = this.props.dataUrl;
    Store.query(url,filter,(events)=>{
      this.setStateSafely({events:events,loaded:true});
    },(failResponse)=>{
      console.log(failResponse);
    })
  }
  open = (e)=>{
    this.setStateSafely({open:true});
    this.getEvents();
  }
  close = (e)=>{
    this.setStateSafely({open:false});
  }
  onFilterChange = (filter)=>{
    this.setStateSafely({filter:filter});
    this.getEvents(filter);
  }
  render(){
    var loadingIndicator = (<div></div>);
    if(!this.state.loaded){
      loadingIndicator= (<Loading type="static"/>);
    }
    if(!this.state.open){
      if(this.props.event_count > 0){
        return(
          <div className="show-events-container">
            <Action onClick={this.open}>{this.props.event_count} Events</Action>
          </div>
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
          <Action onClick={this.close} className="show-events-action">weniger Anzeigen</Action>
          <br/>
          <br/>
          <Divider/>
          <EventFilterBar onFilterChange={this.onFilterChange}/>
          <div className="show-events">
            {eventItems}
          </div>
          <Divider/>

          {loadingIndicator}
        </div>
      )
    }
  }
}
export default ShowEventsHelper;
