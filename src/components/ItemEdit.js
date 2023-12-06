import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './ItemEdit.css'
import ItemEditName from './ItemEditName'


export default function ItemEdit({id, name, shoplistId, categoryId}) {
  const [removed, setRemoved] = useState(false)
  const [editName, setEditName] = useState(false)
  const [itemName, setItemName] = useState(name)

  const editNameCallback = (newName) => {
    if(newName !== null) {
      setItemName(newName)
    }
    setEditName(false)
  }

  if(editName) {
    return <ItemEditName name={itemName} callback={editNameCallback}/>
  }

  return (
    <div className="d-flex">
      <div className="me-2"><button onClick={()=>setRemoved(!removed)}>X</button></div>
      <div className={`me-auto ${removed ? "removed": "" }`}><span>{itemName}</span></div>
      <div><button onClick={()=>{setRemoved(false);setEditName(!editName)}}>Edit</button></div>
    </div>
  );
}
