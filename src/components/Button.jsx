import React from 'react'
import { NavLink } from 'react-router-dom'

const Button = (props) => {
  return (
    <button className={`w-60 border-2 text-${props.color} border-${props.color} px-10 py-3 rounded-2xl`}>
      <NavLink to={`/${props.link}`}>{props.text}</NavLink>
    </button>
  )
}

export default Button