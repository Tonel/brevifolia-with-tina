import Layout from "../components/Layout"
import BlogList from "../components/BlogList"
import {staticRequest} from "tinacms";

const Index = props => {
  return (
      <Layout
          pathname="/"
          siteTitle={props.title}
          siteDescription={props.description}
      >
        <section>
          <BlogList allBlogs={props.allBlogs} />
        </section>
      </Layout>
  )
}

export default Index

export async function getStaticProps() {
  // getting the website config
  const siteConfig = await import(`../data/config.json`)

  const postList = await staticRequest({
    query: `
      query {
        postConnection {
          edges {
            node {
              title
              author       
              date
              hero_image
              body
              _sys {
                filename
              }
            }
          }
        }
      }
    `,
    variables: {
    },
  })

  // converting the data retrieved with GraphQL with
  // a more useful format
  const posts = postList.postConnection.edges.map((edge) => {
    return {
        title: edge.node.title,
        author: edge.node.title,
        date: edge.node.date,
        hero_image: edge.node.hero_image,
        body: edge.node.body,
        slug: edge.node._sys.filename
    }
  })

  return {
    props: {
      allBlogs: posts,
      title: siteConfig.default.title,
      description: siteConfig.default.description,
    },
  }
}
