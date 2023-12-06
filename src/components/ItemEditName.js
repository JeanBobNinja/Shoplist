import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './ItemEdit.css'


export default function ItemEditName({name, callback}) {
  const [itemName, setItemName] = useState(name)

  const onInput = (e) => {
    setItemName(e.target.value)
  }

  const onKeyDown = (e) => {
    if(e.key === 'Enter') {
      return submit(itemName)
    }

    if(e.key === 'Escape') {
      callback(null)
    }
  }

  const submit = (value) => {
    callback(value.trim())
  }

  return (
    <div className="d-flex">
      <div className="me-auto">
        <input type="text" defaultValue={itemName} onInput={onInput} onKeyDown={onKeyDown} autoFocus/>
      </div>
    </div>
  )
}
