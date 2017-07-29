import React from 'react';
import Component from './Component';
import LocationFormHelper from './LocationFormHelper';
import TextField from 'material-ui/TextField';
import VerticalDivider from './VerticalDivider';
import ToggleForm from './ToggleForm';
import HelperFuncs from '../services/HelperFuncs';
import '../css/EventFilterBar.css';
import RangeSelector from './RangeSelector';
// import Slider from './Slider';
import Toggle from './Toggle';
import Invisible from './Invisible';
import FlatButton from 'material-ui/FlatButton';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import QueryFilter from './QueryFilter';
class FilterSelector extends Component{

    // onChange = (vals)=>{
    //   this.props.onChange(vals)
    // }
  getOptions = ()=>{

    var  options=[
        {value:"location",label:"Ort",fields:["lat","lng"]},
        {value:"dist",label:"Distanz",fields:["dist"],disabled:!this.isOptionSelected("location")},
        {value:"query",label:"Textsuche",fields:["query"]},
        {value:"small",label:"kleine Filter",fields:["include_past","exclude_future"]},
        {value:"range",label:"Zeitrahmen",fields:["startDate","endDate"]}
      ];
      return options;
  }
  isOptionSelected = (value)=>{
    var selected = this.props.selected || [];
    var arr = selected.filter((item)=>{
      return item.value === value;
    });
    return arr.length >= 1;
  }
  render(){
    return(
      <div className="filter-selector-container">
        <Select
          name="form-field-name"
          multi={true}
          value={this.props.selected}
          options={this.getOptions()}
          onChange={this.props.onChange}
        />
      </div>
    )
  }
}
const defaultFilter = {
  lat:null,
  lng:null,
  query:"",
  include_past:false,
  exclude_future:false,
  startDate:null,
  endDate:null,
  dist:null
}

class EventFilterBar extends Component{
  state ={
    open:false,
    filterSettingsOpen:false,
    selectedFilters:[
        {value:"location",label:"Ort",fields:["lat","lng"]},
        // {value:"query",label:"Textsuche",fields:["query"]},
    ], //coresponds to FilterSelector:options
    filter:Object.assign({},defaultFilter)
  }
  onFilterSettingChange = (selectedOptions)=>{
    var oldSelectdFilters = this.state.selectedFilters;
    var removedFilters = oldSelectdFilters.filter((filter)=>{
      return !HelperFuncs.isInArray(selectedOptions,filter,(obj)=>{return obj.value});
    });
    removedFilters.forEach((filter)=>{
      this.resetFilter(filter);
    });

    this.setStateSafely({selectedFilters:selectedOptions});
  }
  resetFilter = (filter)=>{

    this.setStateSafely((prevState,prevProps)=>{
      var newFilter = Object.assign({},prevState.filter);
      filter.fields.forEach((key)=>{
        newFilter[key] = defaultFilter[key];
      });
      return {
        filter:newFilter
      }
    });
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
    this.setStateSafely({filter:filterCopy});
  }
  onFilterChange=(e)=>{
    e.preventDefault();
    var filterCopy = Object.assign({},this.state.filter);
    filterCopy[e.target.name] = e.target.value;
    this.setStateSafely({filter:filterCopy});

  }
  onRangeChange = (range)=>{
    var filterCopy = Object.assign({},this.state.filter);
    filterCopy["startDate"]=range.startDate;
    filterCopy["endDate"]=range.endDate;
    this.setStateSafely({filter:filterCopy});
  }
  componentDidMount(){
  //  this.props.onFilterChange(this.filter(this.state.filter)); //bring standard filters up

  }
  componentDidUpdate(prevProps, prevState){
    if(!HelperFuncs.areObjectsEquivalent(prevState.filter,this.state.filter)){
       this.props.onFilterChange(this.filter(this.state.filter));
    }
  }
  getFilterFromOption = (option)=>{
    switch (option.value) {
      case "location":
        return (
          <div className="location-filter" key="location-filter">
            <LocationFormHelper onLocationChange={this.onPositionChange}/>
          </div>
        )
        // eslint-disable-next-line
        break;
      case "dist":
        return(
          <div className="dist-filter" key="dist-filter">
            <TextField name="dist" floatingLabelText="Distanz" type="number" value={this.state.filter.dist} onChange={this.onFilterChange} fullWidth={false}  style={{width:"70%"}}/>
          <span>  km</span>
          </div>
        )
        // eslint-disable-next-line
      break;
      case "query":
        return(
          <div className="query-filter" key="query-filter">
            <QueryFilter name="query" query={this.state.filter.query} onChange={this.onFilterChange}/>
          </div>
        )
        // eslint-disable-next-line
      break;
      case "small":
        return(
          <div className="small-filters" key="small-filters">
            <ToggleForm name="include_past" toggle={this.state.filter.include_past} onClick={this.onFilterChange} text="mit vergangenen Events"/>
            <ToggleForm name="exclude_future" toggle={this.state.filter.exclude_future} onClick={this.onFilterChange} text="nur vergangene Events"/>
          </div>
        )
        // eslint-disable-next-line
      break;
      case "range":
        return(
          <div className="date-range-filter" key="date-range-filter">
            <RangeSelector onSubmit={this.onRangeChange}/>
          </div>
        )
        // eslint-disable-next-line
      break;
      default:
        console.log("wrong use of getFilterFromOption func");
    }
  }
  constructFilters = ()=>{
    var selectedFilters = this.state.selectedFilters;
    var filterItems = selectedFilters.map((filter)=>{
      return this.getFilterFromOption(filter);
    });
    var items = [];
    var tmp_id = 0;
    if(filterItems.length >= 1){
      items.push(<VerticalDivider key={tmp_id}/>);
      tmp_id++;
      items.push(filterItems[0]);
      items.push(<VerticalDivider  key={tmp_id}/>);
      tmp_id++;
    }
    for (var i = 1; i < filterItems.length; i++) {
      items.push(filterItems[i]);
      items.push(<VerticalDivider  key={tmp_id}/>);
      tmp_id++;
    }
    return items;
  }
  render(){

    return(
      <div className="filter-bar-container">

        <FlatButton onClick={()=>{this.setStateSafely({open:!this.state.open})}}>Filter {this.state.open? "einklappen" : "ausklappen"}</FlatButton>
         <Invisible invisible={!this.state.open}>
          <div className="filter-bar">
            {this.constructFilters()}
      </div>
        <FlatButton onClick={()=>{this.setStateSafely({filterSettingsOpen:!this.state.filterSettingsOpen})}}>Filter einstellen</FlatButton>

      </Invisible>
        <Toggle toggle={this.state.filterSettingsOpen}>

          <FilterSelector selected={this.state.selectedFilters} onChange={this.onFilterSettingChange}/>

        </Toggle>
      </div>
    )
  }
}
export default EventFilterBar;
