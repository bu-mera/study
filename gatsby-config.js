module.exports = {
  siteMetadata: {
    title: ``,
    description: ``,
    author: ``,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `${__dirname}/src/utils/typography.js`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // markdown
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-code-titles`,
          // 行
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: `language-`,
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            }
          },
          // 画像
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
              // wrapperStyle: `width: auto;`
              // linkImagesToOriginal: false
              // backgroundColor: `none`,
              // loading: `eager`,
            }
          },
          // リンクを新規タブで開く
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              rel: `noopener noreferrer`
            }
          }
        ]
      }
    },
    `gatsby-plugin-sass`
    // `gatsby-plugin-offline`,
  ],
}
