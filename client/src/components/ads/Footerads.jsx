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
    <ins
      className="adsbygoogle w-100"
      style={{ display: "block" }}
      data-ad-format="autorelaxed"
      data-ad-client="ca-pub-3982561798373930"
      data-ad-slot="4994340952"
    ></ins>
  );
};

export default Abovepost;
