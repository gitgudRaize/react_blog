// <--- Components --->
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
// <--- Route --->
import { Route, Routes } from "react-router-dom";
// <--- Data Provider --->
// <--- useContext --->
// import { DataProvider } from "./context/DataContext";
// <--- Easy Peasy Redux --->
import { useStoreActions } from "easy-peasy";

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts/"
  );

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  return (
    <div className="App">
      <div className="HeaderNav">
        <Header title="React JS Blog" />
        <Nav />
      </div>
      <Routes>
        <Route
          path="/"
          element={<Home fetchError={fetchError} isLoading={isLoading} />}
        />
        <Route path="post" element={<NewPost />} />
        <Route path="post/:id" element={<PostPage />} />
        <Route path="edit/:id" element={<EditPost />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
