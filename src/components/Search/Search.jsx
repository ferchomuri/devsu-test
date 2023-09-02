import React from "react";

import "./Search.css";

const Search = ({ text, action }) => {
  return (
    <input
      className='btn-search'
      type='text'
      placeholder={text}
      onChange={action}
    />
  );
};

export default Search;
