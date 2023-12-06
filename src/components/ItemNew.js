import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './ItemEdit.css'


export default function ItemNew({name, callback}) {
  if(!name) name = "";
  const [value, setValue] = useState(name)

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

  const submit = (newValue) => callback(newValue.trim())

  return (
    <div className="d-flex">
      <div className="me-auto">
        <input type="text" placeholder="New item..." value={value} onInput={onInput} onKeyDown={onKeyDown} />
      </div>
      { value.length !== 0 ? <div className="d-flex flex-row">
        <i onClick={() => setValue("")}>N</i>
        <i onClick={() => submit(value)}>Y</i>
      </div>: null }
    </div>
  )
}
