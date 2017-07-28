import React, {Component} from 'react';
import Store from './services/Store';
import AuthStore from './services/AuthStore';
import IfAdmin from './helperComponents/IfAdmin';
import GoogleMap from './helperComponents/GoogleMap';
import Loading from './helperComponents/Loading';
import Paper from 'material-ui/Paper';
import DateDifference from './helperComponents/DateDifference';
import DistHelper from './helperComponents/DistHelper';
import Tag from './helperComponents/Tag';
import DateShower from './helperComponents/DateShower';
import './css/DetailedEvent.css';
import AddressDisplay from './helperComponents/AddressDisplay';
class DetailedEvent extends Component{
  state={
    event:null,
    loaded:false
  }
  getEvent = ()=>{
    var event_id = this.props.match.params.event_id;
    Store.receive("events/"+event_id,(event)=>{
      this.setState({event:event,loaded:true});
    },(failResponse)=>{
      console.log(failResponse);
    })
  }
  componentDidMount(){
    this.getEvent();
  }
  render(){

    if(!this.state.loaded){
      return(<Loading/>)
    }
    var event = this.state.event;
    var tagItems = event.tags.map((tag)=>{
      return <Tag key={tag.id} tag={tag}/>
    });
    return(
      <div className="detailed-event-container">

        <Paper className="detailed-event">
          <div className="detailed-event-info-bar">
            <div className="detailed-event-infor-bar-date">
              <DateShower date={event.date}/>
              <br/>
              <DateDifference date={event.date} className="detailed-event-small"/>
            </div>
            <div className="detailed-event-infor-bar-location">
              <AddressDisplay location={{lat:event.lat,lng:event.lng}}/>

              <DistHelper dist={event.dist} className="detailed-event-small"/>

            </div>
          </div>
          <div className="detailed-event-tag-bar">
            {tagItems}
          </div>
          <h2 className="detailed-event-title">{event.title}</h2>
          <p className="detailed-event-description">{event.description}</p>
          <GoogleMap center={{lat:event.lat,lng:event.lng}} size={400}/>
        </Paper>
      </div>
    )
  }
}
export default DetailedEvent;
