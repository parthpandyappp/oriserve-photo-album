import axios from "axios";
import { useEffect, useState } from "react";
import { DefaultAlbum, SearchedAlbum } from "../components";

const Home = () => {
  const [pics, setPics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
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
              setPage(1); // Reset page number when search query changes
            }}
            placeholder="Search for photos..."
          />
          {searchQuery.length > 0 && (
            <div className="w-full h-28 p-1 border-r border-l border-b border-black bg-red-200"></div>
          )}
        </div>
      </div>
      {searchQuery.length > 0 ? (
        <SearchedAlbum pics={pics} />
      ) : (
        <DefaultAlbum />
      )}
    </main>
  );
};

export { Home };
