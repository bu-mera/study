/**
 * tags
 */

import React from 'react'
import { graphql } from 'gatsby'
// import { Helmet } from 'react-helmet'
import Const from '../const'
// components
import SEO from '../components/seo'
import Header from '../components/Header'
import List from '../components/List'
import { Container, Layout, LayoutMain, LayoutAside } from '../components/Layout'

const TagsPage = ({ data, pageContext }) => {
  const { edges = [] } = data.allMarkdownRemark

  return (
    <Container>
      <SEO title={ `${ Const.SITE_NAME } | Brewus` } />

      <Header />

      <Layout>
        <LayoutMain>
          <h1>{ `${ pageContext.tag }` }</h1>
          <List items={ edges } />
        </LayoutMain>

        <LayoutAside />
      </Layout>
    </Container>
  )
}

export const pageQuery = graphql`
query($tag: String) {
  allMarkdownRemark(
    limit: 2000
    filter: { frontmatter: { active: { eq: 1 }, tags: { in: [ $tag ] } } }
  ) {
    totalCount
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY/MM/DD")
          title
          tags
        }
      }
    }
  }
}
`

export default TagsPage
