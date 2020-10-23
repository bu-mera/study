import React, { memo, useState, useEffect, useReducer, useContext, createContext } from 'react'
import axios from 'axios'
import InputText from './InputText'
import Tag from './Tag'

import './layout.scss'

export const context = createContext()
const { Provider } = context

export const initialState = {
  isSpMenu: false
}

export const reducer = (state, actions) => {
  switch (actions.type) {
    case `setIsSpMenu`:
      return { ...state, isSpMenu: actions.payload.isSpMenu }
    default:
      return {}
  }
}

export const Container = memo((props) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  return (
    <Provider
      value={{
        state,
        dispatch
      }}
    >
      <div className={ props.className }>
      { props.children }
      </div>
    </Provider>
  )
})

export const Layout = memo(({ className, children }) => {
  return <div className={ className ? `layout ${ className }` : 'layout' }>{ children }</div>
})

export const LayoutMain = memo(({ children }) => {
  return <div className="layout__main">{ children }</div>
})

export const LayoutAside = memo(({  }) => {
  const [ tags, setTags ] = useState([])
  const ct = useContext(context)
  const { state } = ct

  // タグ一覧
  const fetchTags = async () => {
    const searchJSON = await axios.get('/static/search.json').then(res => res ? res.data || [] : [])
    const tags = searchJSON
      .reduce((whole, { tags }) => {
        return tags && tags.length ? whole.concat(tags) : whole
      }, [])
      .filter((x, i, self) => {
        return self.indexOf(x) === i
      })

    setTags(tags)
  }

  useEffect(() => {
    fetchTags()

    return () => {}
  }, [])

  const cn = React.useMemo(() => {
    return state.isSpMenu ? `layout__aside layout__aside--show` : `layout__aside`
  }, [ state.isSpMenu ])

  return (
    <div className={ cn }>
      <form action="/search" method="get">
        <InputText name="q" placeholder="キーワードを入力" />
      </form>

      <div className="tags">
        { tags.map((tagname, i) => {
            return <Tag key={ i } tagname={ tagname } />
          })
        }
      </div>
    </div>
  )
})
