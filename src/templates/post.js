import React from 'react'
import { graphql } from 'gatsby'
// import { Helmet } from 'react-helmet'
import Const from '../const'
// components
import SEO from '../components/seo'
import Header from '../components/Header'
import Tag from '../components/Tag'
import { Container, Layout, LayoutMain, LayoutAside } from '../components/Layout'

import './post.scss'

const PostPage = ({ data, location, pathContext }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  // const { frontmatter, fields, html } = markdownRemark
  const { title, date, tags } = frontmatter
  // const { slug } = fields

  return (
    <Container className="post">
      <SEO title={ `${ Const.SITE_NAME } | Brewus` } />

      <Header />

      <Layout className="post__container">
        <LayoutMain>
          <div className="note">
            <div className="note__head">
              <time dateTime={ date }>{ date }</time>
              <h1 className="note__head__title">{ title }</h1>

              <div className="post__tags">
                { tags.map((tagname, i) => {
                    return <Tag key={ i } tagname={ tagname } />
                  })
                }
              </div>
            </div>

            <div className="note__contents">
              <div
                className="note__contents__markdown"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </LayoutMain>

        {/*<LayoutAside />*/}
      </Layout>
    </Container>
  )
}

export const query = graphql`
query($path: String!) {
  markdownRemark(fields: { slug: { eq: $path } }) {
    html
    fields {
      slug
    }
    frontmatter {
      title
      date(formatString: "YYYY/MM/DD")
      tags
    }
  }
}
`
export default PostPage
