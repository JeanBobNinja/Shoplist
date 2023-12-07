import React, {useState} from 'react';

export default function ShoplistNew({onSubmit, close}) {
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
    <div className="card text-center">
      <div className="card-body">
        <div>
          <input type="text" value={value} onInput={onInput} onKeyDown={onKeyDown} autoFocus/>
        </div>
      </div>
    </div>
  );
}

