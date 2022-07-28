import { useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
const Infeedfooter = () => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    console.log(window.adsbygoogle);
  }, []);

  return (
    <>
      {_.times(4, (i) => (
        <div
          key={i}
          className={`card border-0 position-relative bg-${
            isdarkMode ? "dark" : "light"
          }`}
        >
          <ins
            className="adsbygoogle"
            style={{ display: "block", textAlign: "center" }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-3982561798373930"
            data-ad-slot="6956892022"
          ></ins>
        </div>
      ))}
    </>
  );
};

export default Infeedfooter;
