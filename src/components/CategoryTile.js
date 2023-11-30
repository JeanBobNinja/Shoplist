import React from 'react';
import {Link} from "react-router-dom";

export default function CategoryTile({title, image, items, onChange}) {

  return (
    <div className="card text">
      <div className="card-body">
        <div>
          <img src={image} width="25px" height="25px"/>
          <span>{title}</span>
        </div>
        <div className="pl-20" style={{"userSelect": "none"}}>
          <fieldset>
            {items.map(i =>
              <div key={i.id}>
                <input type="checkbox" name={i.title} id={i.id} onChange={onChange}/>
                <label htmlFor={i.id}>{i.title}</label>
              </div>
            )}
          </fieldset>
        </div>
      </div>
    </div>
  );
}
