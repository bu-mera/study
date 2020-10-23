import React, { memo } from 'react'
import { Link } from 'gatsby'
import './tag.scss'

const Tag = memo(({ tagname }) => (
  <Link to={ `/tags/${ tagname }` } className="tag">{ tagname }</Link>
))

export default Tag
