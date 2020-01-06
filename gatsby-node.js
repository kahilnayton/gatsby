const path = require("path")

// Registering our url's so we can use our post
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators // destructuring

  const postTemplate = path.resolve("src/templates/blog-post.js")

  return graphql(`
  {
    allMarkdownRemark {
      edges {
        node {
          id 
          frontmatter {
            path 
            title
            date
            author
          }
        }
      }
    }
  }
  `).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }

    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
      })
    })
  })
}
