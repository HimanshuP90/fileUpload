import React from 'react'

const Posts = ({ posts, loading }) => {
    if (loading) {
        return <h2> Loading ...</h2>
    }
    return (
        <ul classNam="list-group mb-4">
            {posts.map(post => (
                <li key={post.id} className="list-group-data">
                    {post.title}
                </li>
            ))}
        </ul>
    )
}

export default Posts
