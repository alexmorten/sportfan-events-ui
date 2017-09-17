import React from 'react';
class Right extends React.Component{
  render(){
    return(
      <div style={{float:"right"}}>{this.props.children}</div>
    )
  }
}
export default Right;
