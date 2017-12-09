import React from 'react';

function TeamSeatingChart(props) {
  let seatingChartName;
  let url;
  if(props.team.hasOwnProperty('seatingChartUrl')) {
    seatingChartName = props.team.venue;
    url = props.team.seatingChartUrl;
  } else {
    seatingChartName = '';
    url = 'https://firebasestorage.googleapis.com/v0/b/anygame-f7326.appspot.com/o/seatingCharts%2Fmissing.png?alt=media&token=5f110d27-6e9f-465b-8f5d-ec45c8f7b62b';
  }
  return(
    <div>
      <label className="text-center">{seatingChartName}</label><br/>
      <img className="image" width="200" src={url} />
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
