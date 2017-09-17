import React from 'react';
class Right extends React.Component{
  render(){
    return(
      <div style={{float:"right",margin:"5px"}}>{this.props.children}</div>
    )
  }
}
export default Right;
