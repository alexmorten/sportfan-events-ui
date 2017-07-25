import React, {Component} from 'react';
import { AsyncCreatable } from 'react-select';
import 'react-select/dist/react-select.css';
import Store from '../services/Store';
class TagFormHelper extends Component {

  onChange = (vals)=>{

    this.props.onChange(vals);
  }
  getOptions = (input, callback)=>{
    Store.query("tags",input ? {query:input} : {},(tags)=>{
      var options = tags.map((tag)=>{
        return {value:tag.id,label:tag.name};
      });
      callback(null,{options:options});
    },(error)=>{
      callback(error);
    },true);
  }
  createNewOption = ({ label, labelKey, valueKey })=>{
    return {label:label,value:new Date().getTime(),isNew:true};
  }
  render(){
    return(
      <div>
        <AsyncCreatable
          name="form-field-name"
          value={this.props.selected}
          multi={true}
          matchPos="any"
          loadOptions={this.getOptions}
          onChange={this.onChange}
          autoload={true}
          newOptionCreator={this.createNewOption}
          placeholder="Sportart(-en)..."
          searchPromptText="Tippen zum Suchen"
          loadingPlaceholder="Laden..."
          promptTextCreator={(label)=>{return ' "'+label+'" hinzufügen'}}
        />
      </div>
    );
  }
}
export default TagFormHelper;
