/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const fs = require('fs')
const fse = require('fs-extra')
const replace = require('replace')
const globule = require('globule')
const path = require('path')
const _ = require('lodash')
const { createFilePath } = require('gatsby-source-filesystem')
// const { paginate } = require('gatsby-awesome-pagination')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  // テンプレート
  const postTemplate = path.resolve(`src/templates/post.js`)
  const tagsTemplate = path.resolve(`src/templates/tags.js`)

  // const buildPagination = posts => {
  //   paginate({
  //     createPage,
  //     items: posts,
  //     itemsPerPage: 2,
  //     pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? '/' : `/page`),
  //     component: path.resolve(`src/pages/index.js`)
  //   })
  // }

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          posts: allMarkdownRemark(
            limit: 1000
          ) {
            edges {
              node {
                html
                fields {
                  slug
                }
                frontmatter {
                  date
                  title
                  tags
                  active
                }
              }
            }
          }
          tags: allMarkdownRemark(
            limit: 2000
          ) {
            group(field: frontmatter___tags) {
              fieldValue
              totalCount
            }
          }
        }
      `).then(res => {
        if (res.errors) return Promise.reject(res.errors)

        const posts = res.data.posts.edges

        // buildPagination(posts)

        posts.forEach(({ node }, i) => {
          node.frontmatter.active
          &&
          createPage({
            path     : node.fields.slug,
            component: postTemplate,
            context  : {
              prev: i === 0 ? null : posts[i - 1].node,
              next: i === (posts.length - 1) ? null : posts[i + 1].node,
            }
          })
        })

        // タグ検索
        const tags = res.data.tags.group

        tags.forEach(tag => {
          createPage({
            path     : `/tags/${ tag.fieldValue }`,
            component: tagsTemplate,
            context  : {
              tag: tag.fieldValue
            }
          })
        })

        // 検索に必要なjsonファイル生成
        const searchJSON = posts.filter(({ node }) => node.frontmatter.active).map(({ node }, i) => {
          return {
            path    : node.fields.slug,
            title   : node.frontmatter.title,
            tags    : node.frontmatter.tags,
            contents: node.html.replace(/\r?\n|<("[^"]*"|'[^']*'|[^'">])*>/g, '') // 改行コードとHTMLタグを除去
          }
        })

        fs.writeFileSync('./public/static/search.json', JSON.stringify(searchJSON, null , 2))
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNodeField, createParentChildLink } = actions

  // if (node.internal.type === 'File') {
  //   node.root = '/study/'
  //
  //   console.log(node);
  // }

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode, trailingSlash: false })
    const number = Number(value.replace(/\//g, ''))

    createNodeField({
      name : `slug`,
      value: `/post/${ number }`,
      node,
    })
  }
}



exports.onPreInit = () => {
  if (process.argv[2] === "build") {
    fse.remove(path.join(__dirname, "docs"))

//     fse.emptyDirSync(path.join(__dirname, "docs"))
//
//     if (!fs.existsSync(path.join(__dirname, "public_dev"))) {
//       fs.mkdirSync(path.join(__dirname, "public_dev"))
//     }
//
//     fs.rmdirSync(path.join(__dirname, "docs"), { recursive: true })
//     fs.renameSync(
//       path.join(__dirname, "public"),
//       path.join(__dirname, "public_dev")
//     )
  }
}

exports.onPostBuild = () => {
  fs.renameSync(path.join(__dirname, "public"), path.join(__dirname, "docs"))

  const filesMatched = globule.find([`./docs/post/**/*.html`, `./docs/*.js`, `./docs/*.map`])
  console.log("filesMatched ************", filesMatched);

  // fs.renameSync(
  //   path.join(__dirname, "public_dev"),
  //   path.join(__dirname, "public")
  // )
  // console.log(find(`${ path.join(__dirname, "docs", "post") }/**/*.html`));

  replace({
    paths: filesMatched,
    regex: '/static',
    replacement: 'https://bu-mera.github.io/study/static',
    recursive: true,
    silent: true,
  })

  replace({
    paths: filesMatched,
    regex: 'href="',
    replacement: 'href="https://bu-mera.github.io/study',
    recursive: true,
    silent: true,
  })
}
