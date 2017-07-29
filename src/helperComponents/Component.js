import React  from 'react';
class Component extends React.Component{

setStateSafely(param){
  if(!this.unmounted){
    this.setState(param)
  }

}
componentWillUnmount(){
  this.unmounted = true;
}
}
export default Component;
