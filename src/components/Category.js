import React , {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Item from './Item'
import ItemEdit from './ItemEdit'
import ItemNew from './ItemNew'


export default function Category({shoplistId, data, items, onChange, onlyDefaultCategory, mode, close, reload}) {
  const [edit, setEdit] = useState(mode === 'edit')
  const [current, setCurrent] = useState(data)
  const [itemsList, setItemsList] = useState(items)
  const [showEditButton, setShowEditButton] = useState(false)

  useEffect(() => {
    setItemsList(items)
  }, [items])

  function updateItemsList(newItem) {
    const newItemsList = [...itemsList]
    newItemsList.push(newItem)
    setItemsList(newItemsList)
  }

  async function deleteCategory() {
    if(itemsList.length !== 0) {
      const verb = itemsList.length === 1 ? "is": "are"
      const subject = itemsList.length === 1 ? "item": "items"
      if(!window.confirm(`There ${verb} ${itemsList.length} ${subject}. Do you want to delete this category?`)) return
    }
    await fetch(`/shoplists/${shoplistId}/categories/${current.id}`, {method: "DELETE"})
    reload()
  }

  function renderItemsList() {
    return (
      <>
        <div className="pl-20" style={{"userSelect": "none"}}>
          {edit ? <div className="mb-2"><ItemNew shoplistId={shoplistId} categoryId={current.id} addToList={updateItemsList} /></div> : null}
          {itemsList?.map(i =>
            edit
            ? <ItemEdit key={i.id} id={i.id} name={i.name} categoryId={current.id} shoplistId={shoplistId} reload={reload}/>
            : <Item key={i.id} id={i.id} name={i.name}/>
          )}
        </div>
      </>
    )
  }

  if(onlyDefaultCategory) {
    return renderItemsList()
  }


  return (
    <div className="card text" onMouseEnter={() => setShowEditButton(true)} onMouseLeave={()=>setShowEditButton(false)}>
      <div className="card-body">
        <div className="d-flex">
          <div className="me-auto">
            <span>{current.name}</span>
          </div>
          {edit ? <div><button onClick={()=>deleteCategory()}>X</button></div>: null}
          {showEditButton || edit ? <div><button onClick={()=>setEdit(!edit)}>Edit</button></div>: null}
        </div>
        {renderItemsList()}
      </div>
    </div>
  );
}