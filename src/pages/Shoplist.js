import React, {useState, useEffect} from 'react';
import {useLoaderData, Link} from "react-router-dom";
import Category from "../components/Category"
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
  const [selectedItems, setSelectedItems] = useState({})

  const {id, shoplist} = useLoaderData();

  const getItemsByCategory = (catId) => {
    return shoplist.items.filter(i => i.category_id === catId)
  }

  const onChangeItems = (category) => {
    return (e) => {
      const isChecked = e.target.checked
      const item = e.target.name
      const newSelectedItems = {...selectedItems}
      const categoryItems = newSelectedItems[category] ?? {}

      if(isChecked) {
        categoryItems[item] = true
      } else {
        delete categoryItems[item]
      }

      if(Object.keys(categoryItems).length === 0) {
        delete newSelectedItems[category]
      } else {
        newSelectedItems[category] = categoryItems
      }

      setSelectedItems(newSelectedItems)
      console.log(newSelectedItems)
    }
  }

  const dumpSelectedItems = () => {
    let str = ""
    const categories = Object.keys(selectedItems).sort()
    for (const category of categories) {
      const items = Object.keys(selectedItems[category]).sort()
      str += `*** ${category} ***\n`
      for (const item of items) {
        str += `   - ${item}\n`
      }
    }
    return str
  }

  const doExport = () => {
    const dumped = dumpSelectedItems()
    if(!dumped) {
      toast.error("Nothing selected")
    } else {
      navigator.clipboard.writeText(dumped)
      toast("Shoplist copied.")
    }
  }

  let body = <div><span>No items.</span></div>
  const onlyDefaultCategory = shoplist.categories.length === 1 && shoplist.categories[0]['name'] === '_'

  if(shoplist.items.length !== 0) {
    body = shoplist.categories?.map((c) =>
              <div key={c.id} className="col-3">
                <Category
                  key={c.id}
                  shoplistId={id}
                  id={c.id}
                  name={c.name}
                  items={getItemsByCategory(c.id)}
                  mode="view"
                  onChange={onChangeItems(c.name)}
                  onlyDefaultCategory={onlyDefaultCategory}
                />
              </div>
            )
  }

  return (
  <div style={{display: "flex"}}>
    <div className="d-flex flex-column">
      <Link to="/">Home</Link>
      <a href="#" className="nav-item" onClick={doExport}>Export</a>
    </div>
    <div className="container b-example-divider">
      <div className="row mt-3">
        {body}
      </div>
    </div>
    <ToastContainer newestOnTop position="top-center" hideProgressBar="true" autoClose="1000" theme="dark"/>
  </div>
  );

}
