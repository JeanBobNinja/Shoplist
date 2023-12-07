import React, {useState} from 'react';
import {Link} from "react-router-dom";

export default function ShoplistTile({id, image, name, reload}) {
  const [showEditButton, setShowEditButton] = useState(false)


  async function deleteShoplist() {
    await fetch(`/shoplists/${id}`, {method: "DELETE"})
    reload()
  }
  return (

    <div className="card text-center" onMouseEnter={() => setShowEditButton(true)} onMouseLeave={()=>setShowEditButton(false)}>
      {showEditButton ? <div><button onClick={()=>deleteShoplist()}>X</button></div>: null}
      <Link to={`shoplists/${id}`}>
        <div className="card-body">
          <div>
            <img src={image}/>
          </div>
          <div>
            <span>{name}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
