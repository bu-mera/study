import React, { memo } from 'react'
import { Link } from 'gatsby'
import Tag from './Tag'
import './list.scss'

const List = memo(({ items }) => {

  return (
    <div className="list">
      { items.map(({ node }, i) => {
          const { slug } = node.fields
          const { title, date, tags = [] } = node.frontmatter
          return (
            <div className="list__item" key={ i }>
              <div className="list__item__title">
                <Link to={ slug }>{ title }</Link>
                <span><time dateTime={ date }>{ date }</time></span>
              </div>

              { tags.length &&
                <div className="list__item__tags">
                  { tags.map((tagname, _i) => {
                      return (
                        <Tag key={ _i } tagname={ tagname } />
                      )
                    })
                  }
                </div>
              }
            </div>
          )
        })
      }
    </div>
  )
})

export default List
