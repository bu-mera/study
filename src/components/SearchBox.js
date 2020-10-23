import React, { memo } from 'react'
import InputText from './InputText'
import './searchBox.scss'

const SearchBox = memo(props => {
  return (
    <form action="/search" method="get" className="searchBox">
      <InputText name="q" placeholder="キーワードを入力" />
    </form>
  )
})

export default SearchBox
