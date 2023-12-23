import React from "react";
import Missing from "./Missing";
import format from "date-fns/format";
import { useEffect } from "react";
import { useParams, useNavigate, Routes, Route } from "react-router-dom";
// import api from "./api/posts";
// import DataContext from "./context/DataContext";
import { useStoreState, useStoreActions } from "easy-peasy";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { posts, setPosts, setNavState, logError } = useContext(DataContext);
  // const [editTitle, setEditTitle] = useState("");
  // const [editBody, setEditBody] = useState("");
  // const post = posts.find((post) => post.id.toString() === id);

  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);

  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);
  const setNavState = useStoreActions((actions) => actions.setNavState);

  const getPostsById = useStoreState((state) => state.getPostsById);
  const post = getPostsById(id);

  // <--- Edit post --->
  const handleEdit = (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {
      id: id,
      title: editTitle,
      datetime: datetime,
      body: editBody,
    };
    editPost(updatedPost);
    setNavState("post");
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <>
      {post && (
        <main className="EditPost">
          <h2>Edit Post</h2>
          <form className="editPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editTitle">Title:</label>
            <input
              id="editTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="editBody">Post:</label>
            <textarea
              id="editBody"
              type="text"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="button" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
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

export default EditPost;
