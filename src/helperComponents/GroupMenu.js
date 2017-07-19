import React, {Component} from 'react';
import Store from '../services/Store';
import Menu, {SubMenu, MenuItem} from 'rc-menu';

import 'rc-menu/assets/index.css';
class Item extends Component{
  render(){
    var group = this.props.group;
    console.log(group);
    if(false){//group.direct_sub_group_count > 0){
      return (
         <SubMenu title={group.name}>
           <MenuItem>bla</MenuItem>
         </SubMenu>
       )
    }else{
      return (
        <MenuItem >{group.name}</MenuItem>
      )
    }
  }
 }
class GroupMenu extends Component{
  state = {
    rootGroups:[],
    loaded:false,
    subGroupHash:{},
  }
  componentDidMount(){
    this.getRootGroups();
  }
  getRootGroups = ()=>{
    var dataUrl = this.props.dataUrl;
    Store.receive(dataUrl,(groups)=>{
      this.setState({rootGroups:groups,loaded:true});
      this.getSubGroups(groups);
    },(failResponse)=>{
      console.log(failResponse);
    })
  }
  getSubGroups = (groups)=>{
    groups.map((group)=>{
      var subGroupObj = this.state.subGroupHash[""+group.id];
      if(!subGroupObj || !subGroupObj.status){
        //has not been fetched yet
        var newSubGrupObj = {status:"loading"};
        var subGroupHash = this.state.subGroupHash;
        subGroupHash[""+group.id] = newSubGrupObj;
        this.setState({subGroupHash:subGroupHash})
        Store.receive("groups/"+group.id+"/groups",(subGroups)=>{
          console.log("fetched");
          var updatedSubGrupObj = {status:"finished",subGroups:subGroups}
          var newSubGrupHash = this.state.subGroupHash;
          newSubGrupHash[""+group.id] = updatedSubGrupObj;
          this.setState({subGroupHash:newSubGrupHash});
          this.getSubGroups(subGroups);
        },(failResponse)=>{},true)
      }else{

      }
      return false;
    });
  }
  mapFunction = (group)=>{
    // console.log(group);
    if(group.direct_sub_group_count > 0){
      var subGroupObj = this.state.subGroupHash[""+group.id];
      if(subGroupObj && subGroupObj.status === "finished"){
        //console.log(subGroupObj);
        console.log(subGroupObj.subGroups);
        var subGroupItems = subGroupObj.subGroups.map(this.mapFunction).filter((item)=>{return item});
        console.log(subGroupItems);
        console.log("return 1");
        return (<SubMenu key={group.id} title={group.name}><MenuItem>bla</MenuItem> </SubMenu>)
      }else if (subGroupObj && subGroupObj.status === "loading") {
        console.log("return 2");

        return false;
      }else {
          console.log("panick!");
        return false;

      }
    }else{
      console.log("return 3");

      return(<MenuItem key={group.id} >{group.name}</MenuItem>);
    }

  }
render(){

  var menuItems = this.state.rootGroups.map(this.mapFunction).filter((item)=>{return item});
   console.log(menuItems);
  if(this.state.loaded){
    return(
      <Menu>
        {menuItems}

      </Menu>
    )
  }else{
    return(<div></div>)
  }

}
}
export default GroupMenu;
