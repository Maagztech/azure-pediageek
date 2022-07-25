import { useEffect } from "react";
import { useSelector } from "react-redux";

const Abovepost = () => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="container">
    <ins
      className="adsbygoogle"
      style={{ display: "block"}}
      data-ad-client="ca-pub-3982561798373930"
      data-ad-slot="5932249619"
      data-ad-format="auto"
      data-full-width-responsive='false'
    ></ins>
    </div>
  );
};

export default Abovepost;
