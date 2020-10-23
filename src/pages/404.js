import React, { memo } from 'react'
import SEO from '../components/seo'
import Header from '../components/Header'
import { Container, Layout, LayoutMain, LayoutAside } from '../components/Layout'
import Const from '../const'

export default memo(() => {
  return (
    <Container>
      <SEO title={ `${ Const.SITE_NAME } | Brewus` } />

      <Header />

      <Layout>
        <LayoutMain>
          <h1>ページがありません</h1>
        </LayoutMain>

        <LayoutAside />
      </Layout>
    </Container>
  )
})
