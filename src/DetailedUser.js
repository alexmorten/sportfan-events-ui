import React,{Component} from 'react';
import Store from './services/Store';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import './css/DetailedUser.css';
import Paper from 'material-ui/Paper';
import ShowEventsHelper from './helperComponents/ShowEventsHelper';
import Groups from './Groups';

class DetailedUser extends Component{
  state={
    user:null,
    loaded:false
  }
  getUser = ()=>{
    var user_id = this.props.match.params.user_id;
    Store.receive("users/"+user_id,(user)=>{
      this.setState({user:user,loaded:true});
    },(failResponse)=>{
      console.log(failResponse);
    })
  }

  componentDidMount(){
    this.getUser();
  }
render(){
  if(this.state.loaded){
    var user = this.state.user;
    return (
      <Paper className="detailed-user-container">
        <h4>{user.name}</h4>
        <p>{user.description}</p>
        <p>Website: <a href={"https://"+user.website}>{user.website}</a></p>
        <ShowEventsHelper dataUrl={"users/"+user.id} event_count={user.event_count}/>
        <Groups dataUrl={"users/"+user.id+"/groups"}/>
      </Paper>
    )
  }else{
    return (
      <div className="detailed-user-loading-container">
        <RefreshIndicator status="loading" size={40} top={0} left={0} style={{position:'absolute'}}/>
      </div>);
  }
}
}
export default DetailedUser;
