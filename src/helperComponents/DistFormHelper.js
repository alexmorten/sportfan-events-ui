import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class DistFormHelper extends React.Component{
  handleChange =  (event, index, value) =>{
    var fakeEvent = {};
    fakeEvent.preventDefault = ()=>{};
    var fakeTarget={
      name:this.props.name || "dist",
      value:value
    }
    fakeEvent.target=fakeTarget;
    this.props.onChange(fakeEvent);
  }
  render(){
     return(
       <SelectField

         value={this.props.value}
         onChange={this.handleChange}
         style={{width:undefined,textAlign:"center"}}
         autoWidth={true}
       >
         <MenuItem value={5} primaryText="5km" />
         <MenuItem value={10} primaryText="10km" />
         <MenuItem value={20} primaryText="20km" />
         <MenuItem value={50} primaryText="50km" />
         <MenuItem value={100} primaryText="100km" />
         <MenuItem value={null} primaryText="undefiniert" />

       </SelectField>
     )
  }
}
export default DistFormHelper;
