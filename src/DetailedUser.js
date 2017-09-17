import React,{Component} from 'react';
import Store from './services/Store';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import './css/DetailedUser.css';
import Paper from 'material-ui/Paper';
import ShowEventsHelper from './helperComponents/ShowEventsHelper';
import Groups from './Groups';
import IfAdmin from './helperComponents/IfAdmin';
import VerifyButton from './helperComponents/VerifyButton';
import UnverifyButton from './helperComponents/UnverifyButton';
import MakeAdminButton from './helperComponents/MakeAdminButton';
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
    var linkToWebsiteSplit = user.website.split("//");
    var linkToWebsite = linkToWebsiteSplit[linkToWebsiteSplit.length-1];
    return (
      <div>
      <Paper className="detailed-user-container">
        <IfAdmin>
          <VerifyButton user={user} refresh={this.getUser} />
          <UnverifyButton user={user} refresh={this.getUser} />
          <MakeAdminButton user={user} refresh={this.getUser} />
        </IfAdmin>
        <h4>{user.name}</h4>
        <p>{user.description}</p>
        <p>Website: <a href={"https://"+linkToWebsite}>{user.website}</a></p>
      </Paper>
      <Paper className="detailed-user-container">
        <ShowEventsHelper dataUrl={"users/"+user.id+"/events"} event_count={user.event_count}/>
          <h4>Gruppen</h4>
        <Groups dataUrl={"users/"+user.id+"/groups"} user={user}/>
        </Paper>
      </div>
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
