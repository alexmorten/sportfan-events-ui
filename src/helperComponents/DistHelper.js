import React,{Component} from 'react';

class DistHelper extends Component{
render(){
  var dist = this.props.dist;

  if (typeof dist === "number") {
    var roundedDist = Math.round(this.props.dist*100)/100;
    if(roundedDist === 0){
      return(<span className={this.props.className}>hier</span>)
    }else{
      return (
        <span className={this.props.className}>{ roundedDist +" km entfernt"}</span>
      )
    }
  }else{
    if (!dist) {
      return ( <span className={this.props.className}></span>)
    }

  }

}
}

export default DistHelper;
