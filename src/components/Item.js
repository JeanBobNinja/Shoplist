import React, {useState} from 'react';
import {Link} from "react-router-dom";

export default function Item({id, name, onChange}) {

  return <div className="d-flex">
      <div className="me-2"><input type="checkbox" name={name} id={id} onChange={onChange}/></div>
      <div><label htmlFor={id}>{name}</label></div>
    </div>;
}
