import React,{Component} from 'react';
import Store from '../services/Store';
import Loading from './Loading';
//import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import '../css/GroupSelector.css';
class Group extends Component{
  onClick=()=>{
    this.props.onClick(this.props.group);
  }
  isSelected=()=>{
    return this.props.selected && (this.props.selected.id === this.props.group.id);
  }
  render(){
    var group = this.props.group;
    return(
      <div className="groups-selector-group-container">
        <div className={"group-selector-group"+ (this.isSelected() ? " selected" : "")} onClick={this.onClick}>
          <span>{group.name}</span>

        </div>
        <div className="group-selector-group-childs">
          <Groups dataUrl={"groups/"+group.id+"/groups"} onClick={this.props.onClick} selected={this.props.selected}/>
        </div>
      </div>
    )
  }
}

class Groups extends Component{
  state={
    subGroups:[],
    loaded:false
  }

  getGroups = () =>{
    var dataUrl=this.props.dataUrl;
    Store.receive(dataUrl,(groups)=>{

      this.setState({subGroups:groups,loaded:true});
    })
  }
  componentDidMount(){
    this.getGroups();
  }
  render(){
    if(!this.state.loaded){
      return(<Loading/>)
    }
    // console.log(this.state.subGroups);
    var groupItems=this.state.subGroups.map((group)=>{
      return <Group key={group.id} group={group} selected={this.props.selected} onClick={this.props.onClick}/>
    });
    return (
      <div>
      {groupItems}
      </div>
    )
  }
}
class GroupSelector extends Component{

  render(){
    return(
      <Paper className="group-selector-root">
        <Groups dataUrl={this.props.dataUrl} onClick={this.props.onSelect} selected={this.props.selected}/>
      </Paper>
    );
  }
}
export default GroupSelector;
