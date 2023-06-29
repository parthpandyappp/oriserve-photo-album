import { useState } from "react";
import { PhotoModal } from "./PhotoModal";

const SearchedAlbum = ({ pics }) => {
  const [selectedImage, setSelectedImage] = useState(null);

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
          console.log(
            "LINKS: ",
            `https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_c.jpg`
          );
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

export { SearchedAlbum };
