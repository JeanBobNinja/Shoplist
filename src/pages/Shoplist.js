import React, {useState, useEffect} from 'react';
import {useLoaderData, Link} from "react-router-dom";
import Category from "../components/Category"
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CategoryNew from "../components/CategoryNew"

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

  const [categories, setCategories] = useState(shoplist.categories)
  const [onlyDefaultCategory, setOnlyDefaultCategory] = useState(false)

  const [newCategory, setNewCategory] = useState(false)
  const [newCategoryChildId, setNewCategoryChildId] = useState(null)
  const [gridChildren, setGridChildren] = useState([])


  const [selectedItems, setSelectedItems] = useState({})

  useEffect(() => {
    setOnlyDefaultCategory(categories.length === 1 && categories[0]['name'] === '_')
    const children = []
    categories.map((c) =>
      children.push(<Category
          shoplistId={id}
          id={c.id}
          name={c.name}
          items={getItemsByCategory(c.id)}
          mode="view"
          onChange={onChangeItems(c.name)}
          onlyDefaultCategory={onlyDefaultCategory}
        />
      )
    )

    setGridChildren(children)

  }, [categories])

  useEffect(() => {
    
  }, [gridChildren])

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

  const doExport = (e) => {
    e.preventDefault()
    const dumped = dumpSelectedItems()
    if(!dumped) {
      toast.error("Nothing selected")
    } else {
      navigator.clipboard.writeText(dumped)
      toast("Shoplist copied.")
    }
  }

  const removeNewCategory = () => {
    console.log(newCategoryChildId)
    const newChildren = [...gridChildren]
    newChildren.splice(newCategoryChildId, 1)
    setGridChildren(newChildren)
    setNewCategory(false)
  }

  const addCategory = (e) => {
    e.preventDefault()
    if(newCategory) return

    setNewCategory(true)
    const newChildren = [...gridChildren]
    const newChildId = newChildren.push(<CategoryNew shoplistId={id} closeCallback={removeNewCategory}/>) - 1
    console.log(newChildId)
    setNewCategoryChildId(newChildId)
    setGridChildren(newChildren)
  }



  let body = <div><span>No items.</span></div>

  return (
    <div style={{display: "flex"}}>
      <div className="d-flex flex-column">
        <Link to="/">Home</Link>
        <a href="" className="nav-item" onClick={doExport}>Export</a>
        <a href="" className="nav-item" onClick={addCategory}>Add category</a>
      </div>
      <div className="container b-example-divider">
        <div className="row mt-3">
          {gridChildren.map((c, index) => <div key={index} id={index} className="col-3">{c}</div>)}
        </div>
      </div>
      <ToastContainer newestOnTop position="top-center" hideProgressBar="true" autoClose="1000" theme="dark"/>
    </div>
  );

}
