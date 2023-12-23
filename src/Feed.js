import React from "react";
import { Link } from "react-router-dom";

const Feed = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <article key={post.id} className="post">
          <Link className="postLink" to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">
              {post.body.length <= 20
                ? post.body
                : `${post.body.slice(0, 20)}...`}
            </p>
          </Link>
        </article>
      ))}
    </>
  );
};

export default Feed;
