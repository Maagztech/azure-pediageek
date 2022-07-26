import { useEffect } from "react";
import { useSelector } from "react-redux";

const Abovepost = ({ imageurl }) => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div
      className="container p-0"
      style={{
        backgroundImage: `url(${imageurl})`,
        borderRadius: 10,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-3982561798373930"
        data-ad-slot="2009084964"
        data-full-width-responsive="false"
      ></ins>
    </div>
  );
};

export default Abovepost;
