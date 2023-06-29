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
          }&format=json&nojsoncallback=1&per_page=5&page=${page}&text=${encodeURIComponent(
            searchQuery
          )}&safe_search=1`
        );
        const newPics = res.data.photos.photo;
        setPics((prevPics) => [...prevPics, ...newPics]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPhotos();
  }, [searchQuery, page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="py-3 px-4 h-full w-full">
      <div className="flex justify-center my-6">
        <input
          type="text"
          value={searchQuery}
          className="px-6 py-1 border border-black rounded outline-none text-lg"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for photos..."
        />
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
