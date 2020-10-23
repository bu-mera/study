/**
 * index
 */

import React from 'react'
import Const from '../const'
// components
import SEO from '../components/seo'
import Header from '../components/Header'
import List from '../components/List'
// import InputText from '../components/InputText'
import { Container, Layout, LayoutMain, LayoutAside } from '../components/Layout'

import './search.scss'

import axios from 'axios'
import Fuse from 'fuse.js'

const FUSE_OPTIONS = {
  // tokenize: true,
  // includeMatches: true,
  threshold: 0.3,
  keys: [
    "title"
    // "contents"
  ]
}

const queryParse = (value, sep = '&', eq = '=', isDecode = true) => {
  const decode = isDecode ? decodeURIComponent : (a) => a

  if (value) {
    return value.replace('?', '')
      .split(sep)
      .reduce((obj, v) => {

        const pair = v.split(eq)

        if (pair[0].match(/\[[0-9]\]/)) {
          const key = pair[0].replace(/\[[0-9]\]/g, '')
          if (!obj[key]) {
            obj[key] = []
          }

          obj[key].push(decode(pair[1]))
        } else {
          obj[pair[0]] = decode(pair[1])
        }

        return obj
      }, {})
  }

  return {}
}

const SearchPage = (props) => {
  const queryObj = React.useMemo(() => {
    return queryParse(props.location.search)
  }, [ props.location.search ])

  const [ result, updateRes ] = React.useState([])

  const fetchData = async () => {
    const searchJSON = await axios.get('/static/search.json').then(res => res ? res.data || [] : [])
    const fuse = new Fuse(searchJSON, FUSE_OPTIONS)

    const response = fuse.search(queryObj.q || '')
    const result = response.map(d => {
      return {
        node: {
          fields: {
            slug: d.path
          },
          frontmatter: {
            title: d.title,
            date: d.date,
            tags: d.tags
          }
        }
      }
    })
    updateRes(result)
  }

  React.useEffect(() => {
    fetchData()
    return () => {}
  }, [])

  return (
    <Container className="search">
      <SEO title={ `${ Const.SITE_NAME } | Brewus` } />

      <Header />

      <Layout className="search__container">
        <LayoutMain>
          <h1>{ `検索キーワード：${ queryObj.q || '' }` }</h1>

          <div className="search__result">
            { result.length
              ? <List items={ result } />
              : queryObj.q && !result.length
              ? <p className="search__result__warning">{ `キーワードに一致する記事は見つかりませんでした。` }</p>
              : null
            }
          </div>
        </LayoutMain>

        <LayoutAside />
      </Layout>
    </Container>
  )
}

export default SearchPage
