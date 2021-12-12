const DownloadFile = ({ downloadPageLink }) => {
  return (
    <div className="p-1">
      <h1 className="my-2 text-lg font-medium">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
        dignissimos magni ad aspernatur optio exercitationem fuga dolores,
        repellat iusto nemo maxime voluptate eius ullam fugit, dolor earum
        itaque molestiae consequatur!
      </h1>
      <div className="flex space-x-3">
        <span className="break-all">{downloadPageLink} </span>
        <img
          src="/images/copy.png"
          alt=""
          className="w-8 h-8 object-contain cursor-pointer"
          onClick={() => navigator.clipboard.writeText(downloadPageLink)}
        />
      </div>
    </div>
  );
};

export default DownloadFile;
