import React, {useState} from 'react';
import {Link} from "react-router-dom";


export default function CategoryNew({shoplistId, onSubmit, close}) {
  const [value, setValue] = useState("")

  const onInput = (e) => {
    setValue(e.target.value)
  }

  const onKeyDown = (e) => {
    if(e.key === 'Enter') {
      if(value.length !== 0) {
        setValue("")
        return onSubmit(e.target.value.trim())
      }
      e.target.blur()
    }

    if(e.key === 'Escape') {
      setValue("")
      e.target.blur()
      close()
    }
  }

  const onClose = (e) => {
    e.preventDefault()
    close()
  }

  return (
    <div className="card position-relative">
      <div className="card-body">
        <div className="d-flex">
          <input type="text" placeholder="New category..." value={value} onInput={onInput} onKeyDown={onKeyDown} autoFocus/>
        </div>
      </div>
    </div>
  )
}
