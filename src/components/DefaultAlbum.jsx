import axios from "axios";
import { useEffect, useState } from "react";
import PhotoModal from "./PhotoModal";

const DefaultAlbum = () => {
  const [pics, setPics] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&format=json&nojsoncallback=1&per_page=5&page=${page}&safe_search=1`
        );
        const newPics = res.data.photos.photo;
        setPics((prevPics) => [...prevPics, ...newPics]);
      } catch (error) {
        console.error(error);
      }
    };

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    fetchPhotos();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="flex flex-wrap w-full gap-1 grow">
        {pics.map((pic, index) => {
          return (
            <div key={index} className="grow w-full md:w-1/4 h-96">
              <img
                src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_c.jpg`}
                className="h-full w-full object-cover cursor-pointer"
                alt={pic.title}
                onClick={() => openModal(pic)}
              />
            </div>
          );
        })}
      </div>

      {selectedImage && (
        <PhotoModal selectedImage={selectedImage} closeModal={closeModal} />
      )}
    </>
  );
};

export { DefaultAlbum };
