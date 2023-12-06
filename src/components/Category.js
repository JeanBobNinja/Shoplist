import React , {useState} from 'react';
import {Link} from "react-router-dom";
import Item from './Item'
import ItemEdit from './ItemEdit'
import ItemNew from './ItemNew'

export default function Category({shoplistId, id, name, items, onChange, onlyDefaultCategory, mode}) {
  const [edit, setEdit] = useState(mode === 'edit')
  const [itemsList, setItemsList] = useState(items)

  function newItem(name) {
    console.log(name)
  }

  function renderItemsList() {
    return (
      <>
        <div className="pl-20" style={{"userSelect": "none"}}>
          {edit ? <div className="mb-2"><ItemNew callback={newItem} /></div> : null}
          {itemsList.map(i =>
            edit
            ? <ItemEdit key={i.id} id={i.id} name={i.name} categoryId={id} shoplistId={shoplistId}/>
            : <Item key={i.id} id={i.id} name={i.name} onChange={onChange}/>
          )}
        </div>
      </>
    )
  }


  if(onlyDefaultCategory) {
    return renderItemsList()
  }


  return (
    <div className="card text">
      <div className="card-body">
        <div className="d-flex bd-highlight">
          <div className="me-auto bd-highlight">
            <span>{name}</span>
          </div>
          <div className="bd-highlight">
            <button type="icon" onClick={()=>setEdit(!edit)}>Edit</button>
          </div>
        </div>
        {renderItemsList()}
      </div>
    </div>
  );
}
