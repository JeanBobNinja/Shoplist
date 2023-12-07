import React, {useState, useEffect} from 'react';
import {useLoaderData, Link, useRevalidator} from "react-router-dom";
import Category from "../components/Category"
import CategoryNew from "../components/CategoryNew"
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export async function loader({params}) {

  let shoplist;
  try {
    const response = await fetch(`/shoplists/${params.shoplistId}`)
    shoplist = await response.json()
  } catch(error) {
    shoplist = null;
  }
  return { id: params.shoplistId, shoplist: shoplist };

}

export default function Shoplist() {
  const {id, shoplist} = useLoaderData();
  const [selectedItems, setSelectedItems] = useState({})
  const [showNewCategory, setShowNewCategory] = useState(false)

  const revalidator = useRevalidator()

  const getItemsByCategory = (catId) => {
    return shoplist.items.filter(i => i.category_id === catId)
  }

  const addNewCategoryCard = (e) => {
    e.preventDefault()
    setShowNewCategory(true)
  }

  async function doNewCategory(name) {
    const body = new FormData()
    body.append("name", name)
    const response = await fetch(`/shoplists/${id}/categories`, {method: "POST", body})
    reload()
  }

  const reload = () => {
    setShowNewCategory(false)
    revalidator.revalidate()
  }

  let body = <div><span>No items.</span></div>

  return (
    <div style={{display: "flex"}}>
      <div className="d-flex flex-column">
        <Link to="/">Home</Link>
        <a href="" className="nav-item" onClick={addNewCategoryCard}>Add category</a>
      </div>
      <div className="container b-example-divider">
        <div className="row mt-3">
          {shoplist.categories.map(c =>
            <div key={c.id} className="col-3">
              <Category
                shoplistId={id}
                data={{id: c.id, name: c.name}}
                items={getItemsByCategory(c.id)}
                mode="view"
                reload={reload}
              />
            </div>)
          }
          {showNewCategory ? <div className="col-3"><CategoryNew shoplistId={id} close={()=>setShowNewCategory(false)} onSubmit={(name) => doNewCategory(name)}/></div>: null}
        </div>
      </div>
      <ToastContainer newestOnTop position="top-center" hideProgressBar="true" autoClose="1000" theme="dark"/>
    </div>
  );

}
