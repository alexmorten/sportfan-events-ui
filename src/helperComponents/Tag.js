import React , {Component} from 'react';
import Chip from 'material-ui/Chip';
import {blue200} from 'material-ui/styles/colors';
class Tag extends Component{
  render(){
    var tag = this.props.tag;
      return <Chip key={tag.id} className="tag-chip" style={{margin:4,display:"inline-block",position:"static"}} backgroundColor={blue200}>{tag.name}</Chip>
  }
}
export default Tag;
