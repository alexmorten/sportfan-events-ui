import React, {Component} from 'react';
import Select from 'react-select';
class SingleSelect extends Component{

  onChange = (obj)=>{
    var fakeTarget = {
      name:this.props.name,
      value:obj.value
    };
    var fakeEvent = {
      preventDefault:()=>{},
      target:fakeTarget
    };
    this.props.onChange(fakeEvent);
  }
  getOptionFromValue = (value)=>{
    var options = this.props.options.filter((option)=>{
      return option.value === "value";
    });
    return options[0];
  }
  componentDidMount(){
    this.selected=this.getOptionFromValue(this.props.selected);
  }
  componentWillUpdate(nextProps, nextState){
    this.selected=this.getOptionFromValue(nextProps.selected);
  }
  render(){
    console.log(this.props.value);
    return(
      <div className="filter-selector-container">
        <Select
          name={this.props.name}
          value={this.props.selected}
          options={this.props.options}
          onChange={this.onChange}
          clearable={false}
        />
      </div>
    )
  }
}
export default SingleSelect;
