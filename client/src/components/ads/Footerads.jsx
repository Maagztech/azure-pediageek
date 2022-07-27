import { useEffect } from "react";
import { useSelector } from "react-redux";

const Abovepost = () => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    console.log(window.adsbygoogle);
  }, []);

  return (
    <div style={{ borderRadius: "10px my-2" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-3982561798373930"
        data-ad-slot="4994340952"
      ></ins>
    </div>
  );
};

export default Abovepost;
