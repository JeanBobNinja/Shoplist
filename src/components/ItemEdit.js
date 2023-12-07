import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './ItemEdit.css'
import ItemEditName from './ItemEditName'


export default function ItemEdit({id, name, shoplistId, categoryId, reload}) {
  const [removed, setRemoved] = useState(false)
  const [editName, setEditName] = useState(false)
  const [itemName, setItemName] = useState(name)

  const editNameCallback = (newName) => {
    if(newName !== null) {
      setItemName(newName)
    }
    setEditName(false)
  }

  const removeItem = async () => {
    await fetch(`/shoplists/${shoplistId}/categories/${categoryId}/items/${id}`, {method: "DELETE"})
    reload()
  }

  if(editName) {
    return <ItemEditName name={itemName} callback={editNameCallback}/>
  }

  return (
    <div className="d-flex">
      <div className="me-2"><button onClick={()=>removeItem()}>X</button></div>
      <div className={`me-auto ${removed ? "removed": "" }`}><span>{itemName}</span></div>
      <div><button onClick={()=>{setRemoved(false);setEditName(!editName)}}>Edit</button></div>
    </div>
  );
}
