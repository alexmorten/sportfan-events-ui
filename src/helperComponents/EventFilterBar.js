import React from 'react';
import Component from './Component';
import LocationFormHelper from './LocationFormHelper';

import HelperFuncs from '../services/HelperFuncs';
import '../css/EventFilterBar.css';
import RangeSelector from './RangeSelector';
import 'react-select/dist/react-select.css';
import QueryFilter from './QueryFilter';
import DistFormHelper from './DistFormHelper';
import Paper from 'material-ui/Paper';


class EventFilterBar extends Component{
  state ={
    open:true,
    filter:{
      lat:null,
      lng:null,
      query:"",
      include_past:false,
      exclude_future:false,
      startDate:null,
      endDate:null,
      dist:null
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


  }
  componentDidUpdate(prevProps, prevState){
    if(!HelperFuncs.areObjectsEquivalent(prevState.filter,this.state.filter)){
       this.props.onFilterChange(this.filter(this.state.filter));
    }
  }


  render(){

    return(
      <div className="filter-bar-container">



          <Paper className="filter-bar">

            <div className="query-filter filter-item" key="query-filter">
              <h4 className="filter-description">Text</h4>
              <QueryFilter name="query" query={this.state.filter.query} onChange={this.onFilterChange}/>
            </div>
            <div className="location-filter filter-item" key="location-filter">
              <h4 className="filter-description">Ort</h4>
              <LocationFormHelper onLocationChange={this.onPositionChange}/>
            </div>
            <div className="dist-filter filter-item" key="dist-filter">
              <h4 className="filter-description">Distanz</h4>
              {/* <TextField name="dist" floatingLabelText="Distanz" type="number" value={this.state.filter.dist} onChange={this.onFilterChange} fullWidth={false}  style={{width:"70%"}}/> */}
              <DistFormHelper value={this.state.filter.dist} onChange={this.onFilterChange} name="dist"/>
            </div>
            <div className="date-range-filter filter-item" key="date-range-filter">
              <h4 className="filter-description">Zeitraum</h4>

              <RangeSelector onSubmit={this.onRangeChange}/>
            </div>
      </Paper>
        {/* <FlatButton onClick={()=>{this.setStateSafely({filterSettingsOpen:!this.state.filterSettingsOpen})}}>Filter einstellen</FlatButton>


        <Toggle toggle={this.state.filterSettingsOpen}>

          <FilterSelector selected={this.state.selectedFilters} onChange={this.onFilterSettingChange}/>

        </Toggle> */}
      </div>
    )
  }
}
export default EventFilterBar;
