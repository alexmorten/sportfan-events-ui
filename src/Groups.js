import React,{Component} from 'react';
import Store from './services/Store';
import Loading from './helperComponents/Loading';
import ShowEventsHelper from './helperComponents/ShowEventsHelper';
import Paper from 'material-ui/Paper';
import './css/Groups.css';
import Divider from 'material-ui/Divider';
import AuthStore from './services/AuthStore';
import AddGroupHelper from './helperComponents/AddGroupHelper';
import IfAdmin from './helperComponents/IfAdmin';

class Group extends Component {
  render(){
    var group = this.props.group;
    return(
      <div>
        <Divider/>
        <h4>{group.name}</h4>
        <p>{group.description}</p>
        <ShowEventsHelper dataUrl={"groups/"+group.id+"/events"} event_count={group.event_count}/>
        <Groups dataUrl={this.props.dataUrl} user={this.props.user}/>
      </div>
    );

  }
}
class SubGroupItem extends Component {
  isSelected = ()=>{
    return this.props.selected && (this.props.selected.id === this.props.group.id);
  }
  onClick = ()=>{
    if(this.isSelected()){
      this.props.onClick(null);
    }else{
      this.props.onClick(this.props.group);
    }
  }
  render(){
    var group = this.props.group;
    return (
      <Paper className={"sub-group-item" + (this.isSelected() ? " selected" : "")} onClick={this.onClick}>
        <h4>{group.name}</h4>
        <p>{group.description}</p>
      </Paper>
    )
  }
}

class Groups extends Component{
  state={
    subGroups:[],
    loaded:false,
    selected:null
  }
  getSubGroups = ()=>{
    var dataUrl = this.props.dataUrl
    Store.receive(dataUrl,(groups)=>{
      this.setState({subGroups:groups,loaded:true});
    },(failResponse)=>{
      console.log(failResponse);
    },false);
  }
  addSubGroup = (group)=>{
    var dataUrl = this.props.dataUrl;
    AuthStore.send(dataUrl,group,()=>{
      this.getSubGroups();
    },(failResponse)=>{
      console.log(failResponse);
    })
  }
  componentDidMount(){
    this.getSubGroups();
  }
  componentDidUpdate(prevProps,prevState){
    if(prevProps.dataUrl !== this.props.dataUrl){
      this.setState({subGroups:[],selected:null});
      this.getSubGroups();
    }
  }
  setSelected = (group)=>{
    this.setState({selected:group});
  }
  render(){
    if(!this.state.loaded){
      return(
        <div className="groups-loading-container">
          <Loading type="static"/>
        </div>
      )
    }
    var selected = this.state.selected;
    var subGroupItems = this.state.subGroups.map((group)=>{
      return (<SubGroupItem key={group.id} group={group} selected={selected} onClick={this.setSelected}/>)
    });
    var selectedItem = (<div></div>)
      if(selected){
         selectedItem = (
          <div className="selected-group-container">
            <Group group={selected} dataUrl={"groups/"+selected.id+"/groups"} user={this.props.user}/>
          </div>)
      }
    return (
      <div>
        <div className="sub-groups-container">
          {subGroupItems}
          <IfAdmin user={this.props.user}>
            <Paper className="sub-group-item"><AddGroupHelper add={this.addSubGroup} title="Hinzufügen"/></Paper>
          </IfAdmin>
        </div>
        {selectedItem}
      </div>
    );

  }
}
export default Groups;
