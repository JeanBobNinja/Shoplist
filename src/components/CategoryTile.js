import React from 'react';
import {Link} from "react-router-dom";

export default function CategoryTile({name, image, items, onChange, onlyDefaultCategory}) {

  const list = <div className="pl-20" style={{"userSelect": "none"}}>
                  <fieldset>
                    {items.map(i =>
                      <div key={i.id}>
                        <input type="checkbox" name={i.name} id={i.id} onChange={onChange}/>
                        <label htmlFor={i.id}>{i.name}</label>
                      </div>
                    )}
                  </fieldset>
                </div>

  if(onlyDefaultCategory) {
    return list
  }

  return (
    <div className="card text">
      <div className="card-body">
        <div>
          <span>{name}</span>
        </div>
        {list}
      </div>
    </div>
  );
}
