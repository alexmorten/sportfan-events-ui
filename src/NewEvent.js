import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import AuthStore from './services/AuthStore';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import GroupSelector from './helperComponents/GroupSelector';
import './css/NewEvent.css';
import LocationFormHelper from './helperComponents/LocationFormHelper';
import TagFormHelper from './helperComponents/TagFormHelper';
class NewEvent extends AuthComponent{
  state={
    title:"",
    description:"",
    date:null,
    lat:null,
    lng:null,
    selectedGroup:null,
    selectedTags:[]
  }
  onChange = (e)=>{

    e.preventDefault();
    var obj={};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }
  onLocationChange = (location)=>{
    this.setState({lat:location.lat,lng:location.lng});
  }
  onDateChange=(_, date)=>{
    if(!this.state.date){
      this.setState({date:date});
    }else{ // date and time already set
      var oldDate = this.state.date;
      date.setHours(oldDate.getHours());
      date.setMinutes(oldDate.getMinutes());
      this.setState({date:date});
    }
  }
  onTimeChange=(_,time)=>{
    var date = this.state.date;
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    this.setState({date:date});
  }
  onGroupChange= (group)=>{
    this.setState({selectedGroup:group});
  }
  timePickerDisabled = ()=>{
    return !this.state.date;
  }
  onSubmit = (e)=>{
    e.preventDefault();
    var title=this.state.title,
      description=this.state.description,
      date=this.state.date,
      lat=this.state.lat,
      lng = this.state.lng,
      group = this.state.selectedGroup,
      selectedTags = this.state.selectedTags;
      if(title && description && date && lat && lng && selectedTags.length > 0){
        var newPost={
          title:title,
          description:description,
          date:date,
          lat:lat,
          lng:lng,
          group_id:group ? group.id : null
        };
        var that = this;
        this.post("events",newPost,(event)=>{
          var newTags = selectedTags.filter((tag)=>{return tag.isNew}).map((tag)=>{return {name:tag.label}});
          var oldTags = selectedTags.filter((tag)=>{return !tag.isNew}).map((tag)=>{return {name:tag.label,id:tag.value}});

          var sendTagPromises = newTags.map( (tag)=>{return AuthStore.promiseSend("tags",tag)});
          Promise.all(sendTagPromises).then(function(sendTags){
            var existingTags = oldTags;
            for (var i = 0; i < sendTags.length; i++) {
               existingTags.push(sendTags[i]);
            }
            var sendLinkPromises = existingTags.map((tag)=>{return AuthStore.promiseSend("links",{tag_id:tag.id,event_id:event.id})});
            Promise.all(sendLinkPromises).then(function(){
              console.log(arguments);
              that.props.history.push("/");
              that.props.history.goForward();
            })
          });
        });

      }
      // this.props.history.push("/");
      // this.props.history.goForward();
  }
  dataValid = ()=>{
    var title=this.state.title,
      description=this.state.description,
      date=this.state.date,
      lat=this.state.lat,
      lng = this.state.lng,
      //group = this.state.selectedGroup,
      selectedTags = this.state.selectedTags;
    return (title && description && date && lat && lng && selectedTags.length >0)
  }
  render(){
    var userDetails = AuthStore.getCurrentUserDetails();
    return(
      <div>
        <h4>Neues Event erstellen</h4>
        <form className="new-event-form" onSubmit={this.onSubmit}>
        <TextField name="title" floatingLabelText="Titel" type="text" value={this.state.title} onChange={this.onChange} fullWidth={true}/>
        <TextField name="description" floatingLabelText="Beschreibung"
          multiLine={true} type="text" value={this.state.description} onChange={this.onChange} fullWidth={true}/>
        <TagFormHelper onChange={(vals)=>{this.setState({selectedTags:vals})}} selected={this.state.selectedTags}/>
        <h5>Zeitpunkt auswählen</h5>

        <DatePicker hintText="Datum" onChange={this.onDateChange} name="date" value={this.state.date}/>
        <TimePicker hintText="Uhrzeit" disabled={this.timePickerDisabled()} onChange={this.onTimeChange} format="24hr" />
        <h5>Ort auswählen</h5>

        <LocationFormHelper onLocationChange={this.onLocationChange}/>
        {/* <TextField name="lat" floatingLabelText="Latitude" type="number" value={this.state.lat} onChange={this.onChange} fullWidth={true}/> */}
        <h5>Gruppe auswählen</h5>

        <GroupSelector dataUrl={"users/"+userDetails.id+"/groups"} onSelect={this.onGroupChange} selected={this.state.selectedGroup}/>
        <FlatButton label="Erstellen" onClick={this.onSubmit} type="submit" disabled={!this.dataValid()}/>
        </form>
      </div>
    );
  }
}
export default NewEvent;
