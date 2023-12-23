import React from "react";
import { Link } from "react-router-dom";
// import { useContext } from "react";
// import DataContext from "./context/DataContext";
import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const Nav = () => {
  // const { navState, setNavState, search, setSearch } = useContext(DataContext);
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const navState = useStoreState((state) => state.navState);
  const setNavState = useStoreActions((actions) => actions.setNavState);
  const setSearchResults = useStoreActions(
    (actions) => actions.setSearchResults
  );

  // <--- Search posts --->
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search, setSearchResults]);

  // <--- NavState Style --->
  const navSelected = {
    backgroundColor: "#fafafa",
    color: "black",
  };

  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <input
          id="search"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link
            to="/"
            style={navState === "home" ? navSelected : null}
            onClick={() => setNavState("home")}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/post"
            style={navState === "post" ? navSelected : null}
            onClick={() => setNavState("post")}
          >
            Post
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            style={navState === "about" ? navSelected : null}
            onClick={() => setNavState("about")}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
