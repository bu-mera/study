import React from 'react'
import { Link } from 'gatsby'
import Const from '../const'
// style
import './header.scss'

import { context } from './Layout'

const Header = (props) => {
  const ct = React.useContext(context)
  const { state, dispatch } = ct

  const showMenu = () => {
    dispatch({ type: 'setIsSpMenu', payload: { isSpMenu: !state.isSpMenu } })
  }

  return (
    <header className={ state.isSpMenu ? `header header--show` : `header` }>
      <h1><Link to="/">{ Const.SITE_NAME }</Link></h1>

      <div className="icon" onClick={ showMenu }>
        <div className="icon__item" />
        <div className="icon__item" />
        <div className="icon__item" />
      </div>
    </header>
  )
}

export default Header
