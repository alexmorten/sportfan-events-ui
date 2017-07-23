import React, {Component} from 'react';
import LocationFormHelper from './LocationFormHelper';
import TextField from 'material-ui/TextField';
import VerticalDivider from './VerticalDivider';
import ToggleForm from './ToggleForm';
import HelperFuncs from '../services/HelperFuncs';
import '../css/EventFilterBar.css';
import RangeSelector from './RangeSelector';
class EventFilterBar extends Component{
  state ={
    filter:{
      lat:null,
      lng:null,
      query:"",
      include_past:false,
      exclude_future:false,
      startDate:null,
      endDate:null,
    }
  }

  filter = (filter)=>{
    var keys = Object.keys(filter);
    var newFilter = {};
    for (var i = 0; i < keys.length; i++) {
      if(filter[keys[i]]){
        newFilter[keys[i]] = filter[keys[i]];
      }
    }
    return newFilter;
  }
  onPositionChange=(pos)=>{
    var filterCopy = Object.assign({},this.state.filter);
    filterCopy["lat"] = pos.lat;
    filterCopy["lng"] = pos.lng
    this.setState({filter:filterCopy});

  }
  onFilterChange=(e)=>{
    e.preventDefault();
    var filterCopy = Object.assign({},this.state.filter);
    filterCopy[e.target.name] = e.target.value;
    this.setState({filter:filterCopy});

  }
  onRangeChange = (range)=>{
    var filterCopy = Object.assign({},this.state.filter);
    filterCopy["startDate"]=range.startDate;
    filterCopy["endDate"]=range.endDate;
    this.setState({filter:filterCopy});
  }
  componentDidMount(){
    this.props.onFilterChange(this.filter(this.state.filter)); //bring standard filters up

  }
  componentDidUpdate(prevProps, prevState){
    if(!HelperFuncs.areObjectsEquivalent(prevState.filter,this.state.filter)){
       this.props.onFilterChange(this.filter(this.state.filter));
    }
  }
  render(){

    return(
      <div className="filter-bar">

        <VerticalDivider/>
        <div className="location-filter">
          <LocationFormHelper onLocationChange={this.onPositionChange}/>
        </div>
        <VerticalDivider/>

        <div className="query-filter">
          <TextField name="query" floatingLabelText="Suchen" type="text" value={this.state.filter.query} onChange={this.onFilterChange} fullWidth={false}/>
        </div>
        <VerticalDivider/>
        <div className="dist-filter">
          <TextField name="dist" floatingLabelText="Distanz" type="number" value={this.state.filter.dist} onChange={this.onFilterChange} fullWidth={false}/>
          km
        </div>
        <VerticalDivider/>
        <div className="date-range-filter">
          <RangeSelector onSubmit={this.onRangeChange}/>
        </div>
        <VerticalDivider/>
        <div className="small-filters">
          <ToggleForm name="include_past" toggle={this.state.filter.include_past} onClick={this.onFilterChange} text="mit vergangenen Events"/>
          <ToggleForm name="exclude_future" toggle={this.state.filter.exclude_future} onClick={this.onFilterChange} text="nur vergangene Events"/>

        </div>
        <VerticalDivider/>
      </div>
    )
  }
}
export default EventFilterBar;
