import React from 'react'

import './inputText.scss'

const InputText = props => {
  return (
    <input
      className="inputText"
      type="text"
      placeholder={ props.placeholder }
    />
  )
}

export default InputText
