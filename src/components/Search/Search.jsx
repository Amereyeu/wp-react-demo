import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useClickOutside } from "react-click-outside-hook";
import { useDebounce } from "../../hooks/DebounceHook";
import { IoClose, IoSearch } from "react-icons/io5";

export function SearchBar(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [noArticles, setNoArticles] = useState(false);
  const inputRef = useRef();

  const isEmpty = !articles || articles.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") {
      setNoArticles(false);
    }

    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery("");
    setIsLoading(false);
    setNoArticles(false);
    setArticles([]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (isClickedOutside) {
      collapseContainer();
    }
  }, [isClickedOutside]);

  const prepareSearchQuery = (query) => {
    const url = `${
      import.meta.env.VITE_BASE_URL
    }/wp-json/wp/v2/posts?_embed&search=${query}&per_page=99`;

    return encodeURI(url);
  };

  const searchArticles = async () => {
    if (!searchQuery || searchQuery.trim() === "") {
      return;
    }

    setIsLoading(true);
    setNoArticles(false);

    const URL = prepareSearchQuery(searchQuery);

    const response = await axios.get(URL).catch((err) => {
      console.log("Error: ", err);
    });

    if (response) {
      console.log("Response: ", response.data);

      if (response.data && response.data.length === 0) {
        setNoArticles(true);
      }

      setArticles(response.data);
    }

    setIsLoading(false);
  };

  useDebounce(searchQuery, 500, searchArticles);

  return (
    <div className="search">
      <div className="search__container" ref={parentRef}>
        <div className="search__container__input">
          <span className="search__container__input__icon-left">
            <IoSearch />
          </span>

          <input
            placeholder="Search for Articles"
            onFocus={expandContainer}
            ref={inputRef}
            value={searchQuery}
            onChange={changeHandler}
          />

          <span
            className="search__container__input__icon-right"
            onClick={collapseContainer}>
            {isExpanded && <IoClose />}
          </span>
        </div>

        {isExpanded && (
          <div className="search__content">
            {isLoading && (
              <div className="wrap">
                <div className="posts__placeholder">
                  <div className="circle"></div>
                </div>
              </div>
            )}

            {!isLoading && isEmpty && !noArticles && (
              <div className="wrap">
                <div className="search__content__warning">
                  Start typing to Search
                </div>
              </div>
            )}

            {!isLoading && noArticles && (
              <div className="wrap">
                <div className="search__content__warning">
                  No Articles found!
                </div>
              </div>
            )}

            {!isLoading && !isEmpty && (
              <>
                {articles.map((post, i) => (
                  <div className="search__content__item" key={i}>
                    <h3 className="search__content__item__title">
                      <Link to={`/post/${post.id}`}>{post.title.rendered}</Link>
                    </h3>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

