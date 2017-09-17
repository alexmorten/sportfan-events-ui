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
  createNewOption = (info)=>{


     console.log("") // do not delete , doing so will introduce a nasty bug (for whatever reason?!) ( a network request  is also ok, however more costly)

    var newOption = {label:info.label,value:new Date().getTime(),isNew:true};
    return newOption;
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
          promptTextCreator={(label)=>{return  `"${label}" hinzufügen`}}
          //  promptTextCreator={(label)=>{return label}}
          ignoreCase={false}
          autofocus={true}
          filterOption={() => true}
        />
      </div>
    );
  }
}
export default TagFormHelper;
