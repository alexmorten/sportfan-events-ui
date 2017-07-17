import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import './css/NewEvent.css';
class NewEvent extends AuthComponent{
  state={
    title:"",
    description:"",
    date:null
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
  render(){
    console.log(this.state.date);
    return(
      <div>
        <h4>Neues Event erstellen</h4>
        <form className="new-event-form">
        <TextField name="title" floatingLabelText="Titel" type="text" value={this.state.title} onChange={this.onChange} fullWidth={true}/>
        <TextField name="description" floatingLabelText="Beschreibung"
          multiLine={true} type="text" value={this.state.description} onChange={this.onChange} fullWidth={true}/>
          <DatePicker hintText="Datum" onChange={this.onDateChange} name="date" value={this.state.date}/>
          <TimePicker hintText="Uhrzeit" disabled={this.timePickerDisabled()} onChange={this.ontimeChange} format="24hr" />
        </form>
      </div>
    );
  }
}
export default NewEvent;
