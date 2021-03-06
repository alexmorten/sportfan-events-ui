import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './Login';
import App from './App';
import Register from './Register';
import Events from './Events';
import NewEvent from './NewEvent';
import DetailedUser from './DetailedUser';
import DetailedEvent from './DetailedEvent';
import Administration from './Administration';

class RouteController extends Component{
render(){
  return(
    <Router >
      <Route path="/" >
        <App>
          <Switch>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/vereine/:user_id" component={DetailedUser}></Route>
            {/* <Route path="/vereine" component={Users}></Route> */}
          
            <Route path="/neu" component={NewEvent}></Route>
            <Route path="/events/:event_id" component={DetailedEvent}></Route>
            <Route path="/administration" component={Administration}></Route>
            <Route path="/" component={Events}></Route>
          </Switch>
        </App>
      </Route>
    </Router>
  );
}
}
export default RouteController;
