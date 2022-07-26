import { useEffect } from "react";
import { useSelector } from "react-redux";

const Abovepost = ({ imageurl, imagealt }) => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div
      className="container position-relative p-0"
      title={imagealt}
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
        id="adsense"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-3982561798373930"
        data-ad-slot="2009084964"
        data-full-width-responsive="false"
      >
        <a href={imageurl} target="_blank">
          <span
            class="badge rounded-pill bg-primary position-absolute"
            style={{ bottom: "3%", right: "2%", zIndex: 8, cursor: "pointer" }}
            id="clse"
          >
            View image <i className="fas fa-link"></i>
          </span>
        </a>
      </ins>
    </div>
  );
};

export default Abovepost;
