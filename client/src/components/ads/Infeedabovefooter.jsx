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
            style={{ display: "block" }}
            data-ad-format="fluid"
            data-ad-layout-key="-6r+di+5g-2m-8y"
            data-ad-client="ca-pub-3982561798373930"
            data-ad-slot="2774375871"
          ></ins>
        </div>
      ))}
    </>
  );
};

export default Infeedfooter;
