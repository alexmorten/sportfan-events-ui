import React , {Component} from 'react';
import AuthStore from './services/AuthStore';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import StorageAdaptor from './services/StorageAdaptor';
import './css/Login.css';
import Paper from 'material-ui/Paper';
class Login extends Component{
  state={
    loading:false,
    email:"",
    password:"",
    failed:false,
    errors:{}
  }
  onEmailChange = (e)=>{
    e.preventDefault();
    this.setState({
      email:e.target.value
    });
  }
  onPasswordChange = (e)=>{
    e.preventDefault();
    this.setState({
      password:e.target.value
    });
  }
  shouldButtonBeDisabled = ()=>{
    if(this.state.email && this.state.password){
      return false;
    }else{
      return true;
    }
  }
  handleSubmit = (e)=>{
    console.log("submited");
    e.preventDefault();
    if(this.state.email && this.state.password){
      this.setState({loading:true});
      AuthStore.authenticate(this.state.email,this.state.password,(responseBody)=>{
        this.setState({loading:false});
        this.props.history.push(`/vereine/${responseBody.data.id}`);
        this.props.history.goForward();
      },(failResponse)=>{
        console.log(failResponse);
        this.setState({loading:false});
        failResponse.json().then((failBody)=>{
          console.log(failBody);
          this.setState({
            failed:true,
            errors:failBody.errors
          });

        });
      });
    }
  }
  componentDidMount(){
    var params = queryString.parse(window.location.search)

    if (params["token"] && params["uid"] && params["client_id"] && params["expiry"]) {

      var auth_details = {};
      auth_details["access-token"]=params["token"];
      auth_details["uid"]=params["uid"];
      auth_details["client"]=params["client_id"];
      auth_details["expiry"]=params["expiry"];
      auth_details["token-type"]="Bearer";
      StorageAdaptor.setObject("auth_details",auth_details);
      StorageAdaptor.setItem("authenticated","true");
      AuthStore.receive("me",(userDetails)=>{
        StorageAdaptor.setObject("current_user_data",userDetails);
        this.props.history.push(`/vereine/${userDetails.id}`);
        this.props.history.goForward();
      })

    }
  }
  render(){
  //  console.log(this.props);
    const style={
      container: {
      position: 'relative',
      },
    refresh: {
      display: 'inline-block',
      position: 'absolute',
      },
    };
    var loadingIndicator=(<div></div>);
    if(this.state.loading){
      loadingIndicator = (<RefreshIndicator
        size={40}
        top={-10}
        left={250}
        status="loading"
         style={style.refresh}
      />);
    }
    var errors = (<div></div>);
    if(this.state.failed){
      errors = this.state.errors.map((error)=>{
      return (  <span key={error} className="error">{error}</span>);
      });
    }

    return(
      <Paper className="login-form-container">
        <h2 className="nice-heading">Login</h2>
        <form className="login-form" style={style.container} onSubmit={this.handleSubmit}>

          <TextField  floatingLabelText="Email" type="email" value={this.state.email} onChange={this.onEmailChange}/>
          <br/>
          <TextField floatingLabelText="Passwort" type="password" value={this.state.password} onChange={this.onPasswordChange}/>
          <br/>
          <RaisedButton primary={true} label="Login" disabled={this.shouldButtonBeDisabled()} onClick={this.handleSubmit}/>
          <br/>
          {errors}
          <br/>
          <span className="register-message"> <Link to="/register">Ihr Verein hat noch keinen Account bei uns?</Link> </span>
          {loadingIndicator}
        </form>
      </Paper>);
  }
}
export default Login;
