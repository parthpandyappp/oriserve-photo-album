import React from "react";

const PhotoModal = ({ selectedImage, closeModal }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="max-w-lg mx-auto">
        <img
          src={`https://live.staticflickr.com/${selectedImage.server}/${selectedImage.id}_${selectedImage.secret}_c.jpg`}
          className="w-full"
          alt={selectedImage.title}
        />
        <button
          className="absolute top-4 right-4 text-white text-xl font-bold"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export { PhotoModal };
