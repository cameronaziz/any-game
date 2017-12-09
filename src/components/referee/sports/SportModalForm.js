import React from 'react';

import { formatDate } from '../common/Format';

function SportModalForm(props) {
  return(
    <div className="col-md-12">
      <form>
        hello
        {JSON.stringify(props.item)}
        <div className="form-group">
          <div className="row">
            <div className="col-md-6">
              <label>Sport Name</label>
              <input type="text"
                     name="name"
                     className="form-control"
                     onChange={props.onChange}
                     value={props.item.name} />
            </div>
         </div>
         <div className="row">
           <div className="col-md-6">
             <label>Slug</label>
             <input type="text"
                    name="slug"
                    className="form-control"
                    onChange={props.onChange}
                    value={props.item.slug} />
           </div>
           <div className="col-md-6">
             <label>Acronym</label>
             <input type="text"
                    name="acronym"
                    className="form-control"
                    onChange={props.onChange}
                    value={props.item.acronym} />
           </div>
         </div>
         <div className="row">
           <div className="col-md-6">
             <label>Opening Day</label>
           </div>
         </div>
        </div>
      </form>
    </div>
  );
}

export default SportModalForm;
