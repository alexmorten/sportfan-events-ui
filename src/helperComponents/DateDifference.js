import React ,{Component} from 'react';

class DateDifference extends Component{
  timeDiff (time1,time2){

    var seconds = Math.abs(Math.floor((time1 - time2) / 1000));
    var interval = Math.floor(seconds / 31536000);

    if (interval === 1) {

        return "einem Jahr";
    }else if (interval >= 2) {
      return interval + " Jahren";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval === 1) {

        return "einem Monat";
    }else if (interval >= 2) {
      return interval + " Monaten";
    }
    interval = Math.floor(seconds / 86400);
    if (interval === 1) {

        return "einem Tag";
    }else if (interval >= 2) {
      return interval + " Tagen";
    }
    interval = Math.floor(seconds / 3600);
    if (interval === 1) {

        return "einer Stunde";
    }else if (interval >= 2) {
      return interval + " Stunden";
    }
    interval = Math.floor(seconds / 60);
    if (interval === 1) {

        return "einer Minute";
    }else if (interval >= 2) {
      return interval + " Minuten";
    }
    return Math.floor(seconds) + "s";
  }
  time(){
    var created = new Date(this.props.date);
    var currentTime = new Date();
    if(created > currentTime){
      return "in "+this.timeDiff(created,currentTime);
    }else{
      return "vor  "+this.timeDiff(currentTime,created);
    }
  }
  render(){
      return (
        <span className={this.props.className}>{this.time()}</span>
      )
  }
}
export default DateDifference;
