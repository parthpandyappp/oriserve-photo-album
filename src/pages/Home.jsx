import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { DefaultAlbum, SearchedAlbum } from "../components";

const Home = () => {
  const [pics, setPics] = useState([]);
  const [page, setPage] = useState(1);
  const typingTimeoutRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (hasNoEmptySpaces(searchQuery)) {
      const fetchPhotos = async () => {
        try {
          const res = await axios.get(
            `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
              process.env.REACT_APP_FLICKR_API_KEY
            }&format=json&nojsoncallback=1&per_page=30&page=${page}&text=${encodeURIComponent(
              searchQuery
            )}`
          );
          const newPics = res.data.photos.photo;
          setPics((prevPics) => {
            if (page === 1) {
              return newPics;
            } else {
              return [...prevPics, ...newPics];
            }
          });
        } catch (error) {
          console.error(error);
        }
      };

      fetchPhotos();
    }
  }, [searchQuery, page]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const hasNoEmptySpaces = (str) => {
    return str.split(" ").some((word) => word !== "");
  };

  return (
    <main className="py-3 px-4 h-full w-full">
      <div className="flex justify-center relative mb-24 w-1/2 mx-auto">
        <div className="absolute">
          <input
            type="text"
            value={searchQuery}
            className={`w-full px-6 py-1 border border-black outline-none text-lg ${
              searchQuery.length > 0 ? "rounded-tl rounded-tr" : "rounded"
            }`}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (
                e.target.value.length > 0 &&
                hasNoEmptySpaces(e.target.value)
              ) {
                clearTimeout(typingTimeoutRef.current);
                typingTimeoutRef.current = setTimeout(() => {
                  setSuggestions((prevSuggestions) => [
                    ...prevSuggestions,
                    e.target.value,
                  ]);
                }, 3000);
              }

              setPage(1);
            }}
            placeholder="Search for photos..."
          />
          {searchQuery.length > 0 && suggestions.length > 0 && (
            <div
              id="suggestions"
              className="relative flex flex-col gap-1 w-full h-28 border-r border-l border-b border-black bg-white overflow-scroll"
            >
              <div className="flex flex-col gap-0.5 grow">
                {suggestions &&
                  suggestions.map((suggestion) => (
                    <p className="bg-gray-200 p-1">{suggestion}</p>
                  ))}
              </div>

              <button
                className="sticky w-full bottom-0 bg-red-500 text-white font-semibold p-1"
                onClick={() => setSuggestions([])}
              >
                Clear suggestions
              </button>
            </div>
          )}
        </div>
      </div>
      {searchQuery.length > 0 && hasNoEmptySpaces(searchQuery) ? (
        <SearchedAlbum pics={pics} />
      ) : (
        <DefaultAlbum />
      )}
    </main>
  );
};

export { Home };
