import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [pics, setPics] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&format=json&nojsoncallback=1&per_page=30&page=1&safe_search=1`
      );
      setPics(res.data.photos.photo);
    })();
  }, []);

  return (
    <main className="py-3 px-4 h-full w-full">
      <div className="flex flex-wrap w-full gap-1 grow">
        {pics.length > 0 &&
          pics.map((pic) => {
            return (
              <div className="grow w-1/4 h-96">
                <img
                  src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_c.jpg`}
                  className="h-full w-full  object-cover"
                  alt={pic.title}
                />
              </div>
            );
          })}
      </div>
    </main>
  );
};

export { Home };
