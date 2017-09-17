import React from 'react';
class Left extends React.Component{
  render(){
    return(
      <div style={{float:"left"}}>{this.props.children}</div>
    )
  }
}
export default Left;
