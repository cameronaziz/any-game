import React from 'react';

function TeamSeatingChart(props) {
  return(
    <div>
      <label>{props.team.fileName}</label>
      <img className="image" width="300" src={props.team.seatingChartUrl} />
      <label className="btn btn-outline-primary">Upload Seating Chart
        <input type="file"
               onChange={props.uploadFile}
               hidden />
      </label>
    </div>
  );
}

export default TeamSeatingChart;
