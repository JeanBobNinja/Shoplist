import React from 'react';

function ShoplistTile(props) {

  return (
    <a href="">
      <div className="card text-center">
        <div className="card-body">
          <div>
            <img src={props.image}/>
          </div>
          <div>
            <span>{props.title}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default ShoplistTile;
