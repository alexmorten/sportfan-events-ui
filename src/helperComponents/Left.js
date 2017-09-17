import React from 'react';
class Left extends React.Component{
  render(){
    return(
      <div style={{float:"left",margin:"5px"}}>{this.props.children}</div>
    )
  }
}
export default Left;
