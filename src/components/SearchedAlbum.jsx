const SearchedAlbum = ({ pics }) => {
  return (
    <div className="flex flex-wrap w-full gap-1 grow">
      {pics.map((pic) => (
        <div key={pic.id} className="grow w-1/4 h-96">
          <img
            src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_c.jpg`}
            className="h-full w-full object-cover"
            alt={pic.title}
          />
        </div>
      ))}
    </div>
  );
};

export { SearchedAlbum };
