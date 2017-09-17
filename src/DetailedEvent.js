import React, {Component} from 'react';
import Store from './services/Store';
import GoogleMap from './helperComponents/GoogleMap';
import Loading from './helperComponents/Loading';
import Paper from 'material-ui/Paper';
import DateDifference from './helperComponents/DateDifference';
import GroupHelper from './helperComponents/GroupHelper';
import UserHelper from './helperComponents/UserHelper';
import Tag from './helperComponents/Tag';
import DateShower from './helperComponents/DateShower';
import './css/DetailedEvent.css';
import AddressDisplay from './helperComponents/AddressDisplay';
import Subheader from './helperComponents/Subheader';
import BackIcon from './helperComponents/BackIcon';
import Left from './helperComponents/Left';
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
      return(
        <div>
          <Subheader>
            <Left>
              <BackIcon text="Events" to="/"/>
            </Left>
          </Subheader>
          <Loading/>
        </div>)
    }
    var event = this.state.event;
    var tagItems = event.tags.map((tag)=>{
      return <Tag key={tag.id} tag={tag}/>
    });
    return(
      <div className="detailed-event-container">
        <Subheader>
          <Left>
            <BackIcon text="Events" to="/"/>
          </Left>
        </Subheader>
        <Paper className="detailed-event">
          <div className="event-references">
            <GroupHelper group={event.group}/>
            <UserHelper user={event.user} />
          </div>
          <div className="detailed-event-tag-bar">
            {tagItems}
          </div>
          <div className="detailed-event-flex-container">
            <div>
              <h1 className="detailed-event-title nice-heading">{event.title}</h1>
              <p className="detailed-event-description">{event.description}</p>
              {/* <div className="detailed-event-info-bar"> */}
                <div className="">
                  <h2 className="nice-heading">Zeit</h2>
                  <DateShower date={event.date}/>
                  <br/>
                  <DateDifference date={event.date} className="detailed-event-small"/>
                </div>
                <div className="">
                  <h2 className="nice-heading">Ort</h2>

                  <AddressDisplay location={{lat:event.lat,lng:event.lng}}/>

                  {/* <DistHelper dist={event.dist} className="detailed-event-small"/> */}

                </div>
              {/* </div> */}
            </div>
            <GoogleMap center={{lat:event.lat,lng:event.lng}} size={300}/>
          </div>

        </Paper>
      </div>
    )
  }
}
export default DetailedEvent;
