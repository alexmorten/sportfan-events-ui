import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
class QueryFilter extends Component{

  render(){
    return(
      <div className={this.props.className}>
        <TextField
          name={this.props.name ? this.props.name : "query"}
          floatingLabelText="Suchen"
          type="text"
          value={this.props.query}
          onChange={this.props.onChange}
          fullWidth={false}
          style={{width:"auto"}}/>
      </div>
    )
  }
}
export default QueryFilter;
