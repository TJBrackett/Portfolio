import React from 'react'
import './BlogPosts.css'

export default function BlogPosts(props) {
    return(
        <div>
            <p className="testP">{props.id}</p>
            <p className="testP">{props.title}</p>
            <p className="testP">{props.body}</p>
        </div>
    )
}