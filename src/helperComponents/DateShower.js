import React ,{Component} from 'react';
class DateShower extends Component{
  render(){
    var date=new Date(this.props.date);
    var formatedDate=date.toLocaleString("de");
    return(
      <span>{formatedDate}</span>
    )
  }
}
export default DateShower;
