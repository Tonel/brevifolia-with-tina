import Image from "next/image"
import { staticRequest } from "tinacms"
import Layout from "../../components/Layout"
import styles from "../../styles/Blog.module.css"
import { useTina } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

function reformatDate(fullDate) {
  const date = new Date(fullDate)
  return date.toDateString().slice(4)
}

const query = `
      query BlogPostQuery($relativePath: String!) {
        post(relativePath: $relativePath) {
          title
          author       
          date
          hero_image
          body
        }
      }
`

export default function BlogTemplate(props) {
  const { data } = useTina({
    query,
    variables: props.variables,
    data: props.data,
  })

  return (
      <Layout siteTitle={props.siteTitle}>
        <article className={styles.blog}>
          <figure className={styles.blog__hero}>
            <Image
                width="1920"
                height="1080"
                src={data.post.hero_image}
                alt={`blog_hero_${data.post.title}`}
            />
          </figure>
          <div className={styles.blog__info}>
            <h1>{data.post.title}</h1>
            <h3>{reformatDate(data.post.date)}</h3>
          </div>
          <div className={styles.blog__body}>
            <TinaMarkdown content={data.post.body} />
          </div>
          <h2 className={styles.blog__footer}>Written By: {data.post.author}</h2>
        </article>
      </Layout>
  )
}

export async function getStaticProps(context) {
  // extracting the slug from the context
  const { slug } = context.params

  const config = await import(`../../data/config.json`)

  // note that relativePath also needs
  // the file extension
  const variables = {
    relativePath: `${slug}.md`,
  }

  const data = await staticRequest({
    query,
    variables,
  })

  return {
    props: {
      data,
      variables,
      siteTitle: config.title,
    },
  }
}

export async function getStaticPaths() {
  // getting the list of file names associated to
  // Markdown blog post files
  const postList = await staticRequest({
    query: `
      query {
        postConnection {
          edges {
            node {
              _sys {
                filename
              }
            }
          }
        }
      }
    `,
    variables: {},
  })

  // creating a path for each of the Markdown file name
  // (i.e. for each "slug")
  const paths = postList.postConnection.edges.map((edge) => {
    return {
      params: {
        slug: edge.node._sys.filename
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
