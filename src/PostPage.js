import React from "react";
import Missing from "./Missing";
import { useParams, useNavigate, Route, Routes, Link } from "react-router-dom";
// import DataContext from "./context/DataContext";
// import api from "./api/posts";
// import { useContext } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const PostPage = () => {
  // const { posts, setPosts, logError } = useContext(DataContext);
  const { id } = useParams();
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostsById = useStoreState((state) => state.getPostsById);
  const post = getPostsById(id);
  const navigate = useNavigate();

  // <--- Delete post --->
  const handleDelete = (id) => {
    deletePost(id);
    navigate("/");
  };

  return (
    <>
      {post && (
        <main className="PostPage">
          <article className="post">
            <div className="postContainer">
              <h2>{post.title}</h2>
              <p className="postDate">{post.datetime}</p>
              <p className="postBody">{post.body}</p>
            </div>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
            <Link className="editButton" to={`/edit/${post.id}`}>
              <button>Edit Post</button>
            </Link>
          </article>
        </main>
      )}
      {!post && (
        <Routes>
          <Route path="*" element={<Missing />} />
        </Routes>
      )}
    </>
  );
};

export default PostPage;
