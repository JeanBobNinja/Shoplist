import React from 'react';
import {Link} from "react-router-dom";

export default function ShoplistTile({id, image, name}) {

  return (
    <Link to={`shoplists/${id}`}>
      <div className="card text-center">
        <div className="card-body">
          <div>
            <img src={image}/>
          </div>
          <div>
            <span>{name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
