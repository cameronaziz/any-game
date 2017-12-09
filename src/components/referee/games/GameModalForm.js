import React from 'react';
import SelectTeam from '../common/SelectTeam';

function GameModalForm(props) {
  return (
    <div className="col-md-12">
      <form>
        <div className="form-group">
          <div className="row">
            <div className="col-md-6">
              <label>Home Team</label>
              <select name="homeTeam"
                      className="form-control"
                      onChange={props.onChange} >
                <option value="none">Pick Team</option>
                {Object.entries(props.teams).map((option) => {
                    return <option key={option[0]} value={option[0]}>{option[1].name}</option>;
                })}
              </select>
            </div>
            <div className="col-md-6">
              <label>Away Team</label>
              <select name="awayTeam"
                      className="form-control"
                      onChange={props.onChange} >
                <option value="none">Pick Team</option>
                {Object.entries(props.teams).map((option) => {
                    return <option key={option[0]} value={option[0]}>{option[1].name}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Game Date and Time</label>

            </div>

          </div>
        </div>
      </form>
    </div>
  );
}

export default GameModalForm;
