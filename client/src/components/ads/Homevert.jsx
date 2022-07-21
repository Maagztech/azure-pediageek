import { useEffect } from "react";
import { useSelector } from "react-redux";
import Hometext from "./Hometext";
const Homevert = () => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div
      className={`card border-0 position-relative bg-${
        isdarkMode ? "dark" : "light"
      }`}
    >
      <div className="container">
        <Hometext />
        {/* <ins
          className="adsbygoogle mt-3"
          style={{ display: "block" }}
          data-ad-client="ca-pub-3982561798373930"
          data-ad-slot="6423172384"
          data-ad-format="rectangle"
          data-full-width-responsive="false"
        ></ins>
        <Hometext /> */}
        <ins
          className="adsbygoogle mt-2"
          style={{ display: "block" }}
          data-ad-format="fluid"
          data-ad-layout-key="-6g+dr+1a-5p+dx"
          data-ad-client="ca-pub-3982561798373930"
          data-ad-slot="8226799525"
        ></ins>
      </div>
    </div>
  );
};

export default Homevert;
