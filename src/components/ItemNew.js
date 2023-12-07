import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './ItemEdit.css'


export default function ItemNew({shoplistId, categoryId, addToList}) {
  const [value, setValue] = useState("")

  const onInput = (e) => {
    setValue(e.target.value)
  }

  const onKeyDown = (e) => {
    if(e.key === 'Enter') {
      if(value.length !== 0) {
        setValue("")
        return submit(e.target.value)
      }
      e.target.blur()
    }

    if(e.key === 'Escape') {
      setValue("")
      e.target.blur()
    }
  }

  const submit = (newValue) => {
    (async () => {
      const body = new FormData()
      body.append("name", newValue)
      const response = await fetch(`/shoplists/${shoplistId}/categories/${categoryId}/items`, {method: "POST", body})
      const {id} = await response.json()
      addToList({id: id, name: newValue, category_id: categoryId})
    })();

  }

  return (
    <div className="d-flex">
      <div className="me-auto">
        <input type="text" placeholder="New item..." value={value} onInput={onInput} onKeyDown={onKeyDown} />
      </div>
    </div>
  )
}
