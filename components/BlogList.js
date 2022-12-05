import Link from "next/link"
import styles from "../styles/BlogList.module.css"
import Image from "next/image"

function truncateSummary(astContent) {
    let stringContent = ""

    if (astContent.children) {
        astContent.children.forEach(childNode => {
            childNode.children.forEach(c => {
                if (c.type === "text") {
                    stringContent += c.text
                }

                if (c.type=== "a") {
                    stringContent += c.title
                }
            })
        })

    }
    return stringContent.slice(0, 197).trimEnd() + "..."
}

function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
}

const BlogList = ({ allBlogs }) => {
    return (
        <ul>
            {allBlogs.length > 1 &&
                allBlogs.map(post => (
                    <li key={post.slug}>
                        <Link href={{ pathname: `/blog/${post.slug}` }} className={styles.blog__link}>
                            <div className={styles.hero_image}>
                                <Image
                                    width={384}
                                    height={288}
                                    src={post.hero_image}
                                    alt={post.hero_image}
                                />
                            </div>
                            <div className={styles.blog__info}>
                                <h2>{post.title}</h2>
                                <h3>{reformatDate(post.date)}</h3>
                                <p>{truncateSummary(post.body)}</p>
                            </div>
                        </Link>
                    </li>
                ))}
        </ul>
    )
}

export default BlogList
