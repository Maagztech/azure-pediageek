import { useEffect } from "react";
import { useSelector } from "react-redux";
import Infeedfooter from "./Infeedabovefooter";
import Adsfooter from "./Ads8abovefooter";
const Adsfoot = () => {
  const { darkMode } = useSelector((state) => state);
  const { isdarkMode } = darkMode;

  return (
    <div className={`home_blogs`}>
      <Infeedfooter />
      <Adsfooter />
    </div>
  );
};

export default Adsfoot;
