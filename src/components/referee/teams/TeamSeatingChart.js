import React from 'react';

function TeamSeatingChart(props) {
  let seatingChartName;
  let seatingChartWidth;
  if(props.team.seatingChartUrl) {
    seatingChartName = '';
    seatingChartWidth = 150;
  } else {
    seatingChartName = props.team.venue;
    seatingChartWidth = 300;
  }
  return(
    <div>
      <label className="text-center">{seatingChartName}</label>
      <img className="image" width={seatingChartWidth} src={props.team.seatingChartUrl} />
      <br />
      <label className="btn btn-outline-primary">Upload Seating Chart
        <input type="file"
               onChange={props.uploadFile}
               hidden />
      </label>
    </div>
  );
}

export default TeamSeatingChart;
