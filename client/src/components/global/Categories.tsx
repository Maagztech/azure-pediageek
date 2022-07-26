import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { IParams, RootStore } from "../../utils/TypeScript";

const Category = () => {
  const { categories, darkMode } = useSelector((state: RootStore) => state);
  const { slug } = useParams<IParams>();
  const { isdarkMode } = darkMode;
  const history = useHistory();
  return (
    <div
      className={`example pt-1 px-2 mb-1  border border-start-0 border-end-0`}
      style={{
        position: "sticky",
        display: "block",
        overflow: "scroll",
        whiteSpace: "nowrap",
        zIndex: 9,
        top: 50,
        backgroundColor: isdarkMode ? "#202020" : "white",
      }}
    >
      <Link
        to={`/`}
        className={`btn ${
          history.location.pathname === "/" ? "active-tag" : "btn-tag"
        } rounded-pill mx-1 px-2 text-${isdarkMode ? "white" : "black"}`}
        style={{
          backgroundColor:
            isdarkMode && history.location.pathname !== "/" ? "#373737" : "",
        }}
      >
        Home
      </Link>
      {categories.map((category, index) => (
        <Link
          to={`/blogs/${category.name}`}
          key={index}
          className={`btn ${
            history.location.pathname === "/blogs/" + category.name
              ? "active-tag"
              : "btn-tag"
          }  text-${isdarkMode ? "white" : "black"} rounded-pill mx-1 px-2 `}
          style={{
            backgroundColor:
              isdarkMode &&
              history.location.pathname !== "/blogs/" + category.name
                ? "#373737"
                : "",
          }}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};
export default Category;
