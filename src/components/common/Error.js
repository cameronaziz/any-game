import React from 'react';


function Error(name){
  if(this.props.messages.hasOwnProperty(name)) {
    return(
      <div className="col-md-8 offset-md-2">
        <div className="alert alert-danger" role="alert">
          {this.props.messages[name]}
        </div>
      </div>
    );
  }
}

export default Error;
