import { createContext, useState, useEffect } from "react";
// <--- Custom Hooks --->
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [navState, setNavState] = useState("");
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts/"
  );

  // <--- Fetch posts upon first render --->
  // <--- Using Axios --->
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       setPosts(response.data);
  //     } catch (err) {
  //       logError(err);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  // <--- Using Custom Hooks --->
  useEffect(() => {
    setPosts(data);
  }, [data]);

  // <--- Search posts --->
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  // <--- Error Log --->
  const logError = (err) => {
    if (err.response) {
      // Not in the 200 response range
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <DataContext.Provider
      value={{
        navState,
        setNavState,
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
        logError,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
