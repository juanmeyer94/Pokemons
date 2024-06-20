import { useState } from "react";
import { useFilteredPokemons } from "./Filters";

export const usePagination = () => {
  const filteredPokemons = useFilteredPokemons();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPokemons.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return {
    currentPage,
    postsPerPage,
    currentPosts,
    nextPage,
    prevPage,
  };
};
