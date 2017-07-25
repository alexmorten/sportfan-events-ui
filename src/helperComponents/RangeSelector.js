import { DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import '../css/RangeSelector.css';
import React, {Component} from 'react';
class RangeSelector extends Component{
  state={
    startDate:null,
    endDate:null
  }


  handleSelection = ({startDate,endDate})=>{
    console.log(startDate);
    console.log(endDate);
    this.setState({startDate,endDate});
    if(startDate && endDate){
      var newStartDate = startDate.toDate().getTime()/1000|0;
      var newEndDate = new Date(endDate.toDate().getTime()+(24*60*60*1000)).getTime()/1000|0 ;
      var obj={
        startDate:newStartDate,
        endDate:newEndDate
      }
      this.props.onSubmit(obj);
    }else if (!startDate && !endDate) {
      this.props.onSubmit({startDate:null,endDate:null});
    }
  }


  render(){

    return(
      <div className="range-selector-container">

            <DateRangePicker
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onDatesChange={this.handleSelection}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({ focusedInput })}
              isOutsideRange={() => false}
              orientation={window.innerHeight > window.innerWidth ? "vertical" : "horizontal"}
              showClearDates={true}
              startDatePlaceholderText="Von"
              endDatePlaceholderText="Bis"
              firstDayOfWeek={1}
              displayFormat="DD.MM.YYYY"	/>

      </div>
    );
  }
}
export default RangeSelector;
