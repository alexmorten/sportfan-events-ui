import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import './css/NewEvent.css';
class NewEvent extends AuthComponent{
  state={
    title:"",
    description:"",
    date:null,
    lat:null,
    lng:null
  }
  onChange = (e)=>{

    e.preventDefault();
    var obj={};
    obj[e.target.name] = e.target.value;
    console.log(e.target.value);
    this.setState(obj);
  }
  onDateChange=(_, date)=>{
    console.log(date);
    this.setState({date:date});
  }
  ontimeChange=(_,time)=>{
    var date = this.state.date;
    console.log(date);
    console.log(time);
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    this.setState({date:date});
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
      lng = this.state.lng;
      if(title && description && date && lat && lng){
        var newPost={
          title:title,
          description:description,
          date:date,
          lat:lat,
          lng:lng
        };
        this.post("events",newPost,()=>{
          this.props.history.push("/");
          this.props.history.goForward();
        });

      }
  }
  render(){
    console.log(this.state.date);
    return(
      <div>
        <h4>Neues Event erstellen</h4>
        <form className="new-event-form" onSubmit={this.onSubmit}>
        <TextField name="title" floatingLabelText="Titel" type="text" value={this.state.title} onChange={this.onChange} fullWidth={true}/>
        <TextField name="description" floatingLabelText="Beschreibung"
          multiLine={true} type="text" value={this.state.description} onChange={this.onChange} fullWidth={true}/>
          <DatePicker hintText="Datum" onChange={this.onDateChange} name="date" value={this.state.date}/>
          <TimePicker hintText="Uhrzeit" disabled={this.timePickerDisabled()} onChange={this.ontimeChange} format="24hr" />
        <TextField name="lat" floatingLabelText="Latitude" type="number" value={this.state.lat} onChange={this.onChange} fullWidth={true}/>
        <TextField name="lng" floatingLabelText="Longitude" type="number" value={this.state.lng} onChange={this.onChange} fullWidth={true}/>
        <FlatButton label="Post" onClick={this.onSubmit} type="submit"/>
        </form>
      </div>
    );
  }
}
export default NewEvent;
