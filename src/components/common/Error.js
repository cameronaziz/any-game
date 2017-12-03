import React from 'react';


function Error(props){
  if(props.messages.hasOwnProperty(props.name)) {
    return(
      <div className="col-md-8 offset-md-2">
        <div className="alert alert-danger" role="alert">
          {props.messages[props.name]}
        </div>
      </div>
    );
  } else {
    return(
      <div />
    );
  }
}

export default Error;
