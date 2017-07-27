import React, {Component} from 'react';
import AuthStore from './services/AuthStore';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import './css/Registrate.css';
import LocationFormHelper from './helperComponents/LocationFormHelper';
class Registrate extends Component{
  state={
    loading:false,
    sent:false,
    failed:false,
    errors:{},
    name:"",
    description:"",
    website:"",
    lat:null,
    lng:null,
    email:"",
    password:"",
    password_confirmation:"",
  }
  registrate = ()=>{
    this.setState({loading:true});
    var details = {
      name:this.state.name,
      description:this.state.description,
      website:this.state.website,
      lat:this.state.lat,
      lng:this.state.lng,
      email:this.state.email,
      password:this.state.password,
      password_confirmation:this.state.password_confirmation
    };
    AuthStore.registrate(details,(successBody)=>{
      this.setState({loading:false,sent:true});

    },(failResponse)=>{
      this.setState({loading:false});
      console.log(failResponse);
      failResponse.json().then((responseBody)=>{
        console.log(responseBody);
        this.setState({
          failed:true,
          errors:responseBody.errors
        });
      });
    });
  }
  handleChange = (e)=>{
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }
  onPositionChange = (pos)=>{
    this.setState(pos);
  }
  buttonShouldBeDisabled=()=>{
    return !(this.state.name
       && this.state.email
       && this.state.password
       && this.state.password_confirmation);
  }

  render(){
    if(this.state.sent){
      return(
        <h3>Überprüfe deine e-mails für die Bestätigung!</h3>
      );
    }
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
      />)
    }
    var emailErrors=(<div></div>);
    var passwordErrors=(<div></div>);
    var passwordConfirmationErrors=(<div></div>);
    if(this.state.failed){
      var factoryFunc = (error)=>{
        return (
          <span key={error} className="error-small">{error}</span>
        );
      };
      if(this.state.errors.email)
        emailErrors=this.state.errors.email.map(factoryFunc);
      if(this.state.errors.password)
        passwordErrors=this.state.errors.password.map(factoryFunc);
      if(this.state.errors.password_confirmation)
        passwordConfirmationErrors=this.state.errors.password_confirmation.map(factoryFunc);

    }
    var necessary= (<span className="necessary">*</span>)
    return(
      <form className="register-form" style={style.container} >
        <h4>Account erstellen</h4>
      {necessary}  <TextField  floatingLabelText="Name" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
        <br/>
        <TextField  floatingLabelText="Beschreibung" name="description" type="text" value={this.state.description} onChange={this.handleChange} multiLine={true}/>
        <br/>
        <TextField  floatingLabelText="Website" name="website" type="url" value={this.state.website} onChange={this.handleChange}/>
        <br/>
        <LocationFormHelper onLocationChange={this.onPositionChange}/>
        <br/>
      {necessary}  <TextField  floatingLabelText="Email" name="email" type="email" value={this.state.email} onChange={this.handleChange}/>

        {emailErrors}
      {necessary}  <TextField  floatingLabelText="Passwort" name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
        <br/>
        {passwordErrors}
      {necessary}  <TextField  floatingLabelText="Passwort wiederholen" name="password_confirmation" type="password" value={this.state.password_confirmation} onChange={this.handleChange}/>
        <br/>
        {passwordConfirmationErrors}
        <br/>
        <FlatButton onClick={this.registrate} disabled={this.buttonShouldBeDisabled()}>Account erstellen</FlatButton>
        {loadingIndicator}
        <p className="necessary-explanation">{necessary} muss ausgefüllt sein </p>
      </form>
    );
  }
}
export default Registrate;
