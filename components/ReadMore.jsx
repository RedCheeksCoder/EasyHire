import { useState } from "react";

const ReadMore = ({ text }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="my-4 font-satoshi text-sm text-gray-700 whitespace-pre-wrap">
      {isReadMore ? text.slice(0, 150) : text}
      {text.length > 150 && (
        <span onClick={toggleReadMore} className="cursor-pointer text-blue-700">
          {isReadMore ? "...read more" : " ...show less"}
        </span>
      )}
    </p>
  );
};

export default ReadMore;
