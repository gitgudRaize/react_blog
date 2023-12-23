import React from "react";
import { useStoreState } from "easy-peasy";

const Footer = () => {
  const thisYear = new Date().getFullYear();
  const postCount = useStoreState((state) => state.postCount);

  return (
    <footer className="Footer">
      <p>
        Total Post(s): {postCount} | Copyright &copy; {thisYear}
      </p>
    </footer>
  );
};

export default Footer;
