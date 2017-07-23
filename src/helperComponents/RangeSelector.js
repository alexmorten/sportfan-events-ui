import InfiniteCalendar, {Calendar,withRange} from 'react-infinite-calendar';

import 'react-infinite-calendar/styles.css';
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class RangeSelector extends Component{
  state={
    open:false
  }
  handleClose=()=>{
    this.setState({open:false});
  }
  handleSubmit=()=>{
    this.setState({open:false});
    if(this.dates && this.dates.startDate && this.dates.endDate){
      this.props.onSubmit(this.dates);
    }
  }
  handleSelect = (a)=>{
  
    var newEnd = new Date(a.end.getTime()+(24*60*60*1000));
    console.log(newEnd);
    this.dates={startDate:a.start.getTime()/1000|0,endDate:newEnd.getTime()/1000|0};
  }
  handleOpen = ()=>{
    this.setState({open:true});
  }
  handleClear=()=>{
    this.setState({open:false});
    this.props.onSubmit({startDate:null,endDate:null});
  }
  render(){
    const actions = [
  <FlatButton
    label="Löschen"
    primary={true}
    onTouchTap={this.handleClear}
  />,
  <FlatButton
    label="Ok"
    primary={true}
    keyboardFocused={true}
    onTouchTap={this.handleSubmit}
  />,
];
    return(
      <div>
        <RaisedButton label="Zeitraum eingrenzen" onTouchTap={this.handleOpen} />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <InfiniteCalendar Component={withRange(Calendar)}
             displayOptions={{layout: 'portrait',showHeader: false}}
             locale={{ weekStartsOn: 1}}

             onSelect={this.handleSelect}/>
        </Dialog>
      </div>
    );
  }
}
export default RangeSelector;
