import React, {useState, useEffect} from 'react';
import {useLoaderData, Link, useRevalidator} from "react-router-dom";
import ShoplistTile from '../components/ShoplistTile'
import ShoplistNew from '../components/ShoplistNew'

export async function loader() {

  let shoplists;
  try {
    const response = await fetch(`/shoplists`)
    shoplists = await response.json()
  } catch(error) {
    shoplists = [];
  }
  return { shoplists };

}

function Shoplists() {
  const {shoplists} = useLoaderData();
  const validator = useRevalidator()
  const [showNewShoplistCard, setShowNewShoplistCard] = useState(false)

  function addNewShoplistCard(e) {
    e.preventDefault()
    setShowNewShoplistCard(true)
  }

  async function doAddShoplist(name) {
    const body = new FormData()
    body.append("name", name)
    const response = await fetch('/shoplists', {method: "POST", body})

    reload()
  }

  const reload = () => {
    setShowNewShoplistCard(false)
    validator.revalidate()
  }

  return (
    <div style={{display: "flex"}}>
      <div className="d-flex flex-column">
        <Link to="/">Home</Link>
        <a href="" className="nav-item" onClick={addNewShoplistCard}>Add shoplist</a>
      </div>
      <div className="container">
        <div className="row mt-3">
          {shoplists.map(i =>
            <div key={i.id} className="col-3 pb-3">
              <ShoplistTile id={i.id} name={i.name} image={i.image} reload={reload}/>
            </div>
          )}
          {showNewShoplistCard
            ? <div className="col-3 pb-3">
                <ShoplistNew onSubmit={(name)=>doAddShoplist(name)} close={()=>setShowNewShoplistCard(false)}/>
              </div>
            :null
          }
        </div>
      </div>
    </div>
  );
}

export default Shoplists;
