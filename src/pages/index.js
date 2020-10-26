/**
 * index
 */

import React from 'react'
import { graphql } from 'gatsby'
import Const from '../const'
// components
import SEO from '../components/seo'
import Header from '../components/Header'
import List from '../components/List'
import { Container, Layout, LayoutMain, LayoutAside } from '../components/Layout'

const IndexPage = ({ data }) => {
  // 記事一覧
  const { edges = [] } = data.allMarkdownRemark

  return (
    <Container>
      <SEO title={ `${ Const.SITE_NAME } | Brewus` } />

      <Header />

      <Layout>
        <LayoutMain>
          <List items={ edges } />
        </LayoutMain>

        {/*<LayoutAside />*/}
      </Layout>
    </Container>
  )
}

export const query = graphql`
query {
  allMarkdownRemark(
    filter: {frontmatter: {active: {eq: 1}}}
    limit: 1000
  ) {
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

export default IndexPage
