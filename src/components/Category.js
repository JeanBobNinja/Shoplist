import React , {useState} from 'react';
import {Link} from "react-router-dom";
import Item from './Item'
import ItemEdit from './ItemEdit'
import ItemNew from './ItemNew'
import CategoryNew from './CategoryNew'

export default function Category({shoplistId, data, items, onChange, onlyDefaultCategory, mode, close, onSubmit}) {
  const [edit, setEdit] = useState(mode === 'edit')
  const [itemsList, setItemsList] = useState(items)
  const [current, setCurrent] = useState(data)

  function newItem(name) {
    console.log(name)
  }

  async function newCategory(name) {
    const body = new FormData()
    body.append("name", name)
    const {id} = await fetch(`/shoplists/${shoplistId}/categories`, {method: "POST", body})
    setCurrent({id, name})
    setItemsList([])
    setEdit(true)
    onSubmit()
  }

  function renderItemsList() {
    return (
      <>
        <div className="pl-20" style={{"userSelect": "none"}}>
          {edit ? <div className="mb-2"><ItemNew callback={newItem} /></div> : null}
          {itemsList?.map(i =>
            edit
            ? <ItemEdit key={i.id} id={i.id} name={i.name} categoryId={current.id} shoplistId={shoplistId}/>
            : <Item key={i.id} id={i.id} name={i.name}/>
          )}
        </div>
      </>
    )
  }

  function renderEmpty() {
    return (
      <CategoryNew shoplistId={shoplistId} closeCallback={close} onSubmit={newCategory}/>
    )
  }

  if(!current) {
    return renderEmpty()
  }

  if(onlyDefaultCategory) {
    return renderItemsList()
  }


  return (
    <div className="card text">
      <div className="card-body">
        <div className="d-flex">
          <div className="me-auto">
            <span>{current.name}</span>
          </div>
          <div>
            <button type="icon" onClick={()=>setEdit(!edit)}>Edit</button>
          </div>
        </div>
        {renderItemsList()}
      </div>
    </div>
  );
}