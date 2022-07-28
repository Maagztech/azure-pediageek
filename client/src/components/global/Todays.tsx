import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { RootStore } from "../../utils/TypeScript";
import { Link } from "react-router-dom";
const Todays = () => {
  const { darkMode } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;

  return (
    <>
      <div
        className={`card mb-3 bg-${isdarkMode ? "dark" : "light"} text-${
          isdarkMode ? "white" : "black"
        }`}
        style={{ minWidth: "260px" }}
      >
        <div className="row g-0 p-2">
          <div
            className="col-md-4"
            style={{
              minHeight: "150px",
              maxHeight: "170px",
              overflow: "hidden",
            }}
          >
            <img
              src="https://source.unsplash.com/featured?nature,greenry,forest"
              className="w-100 h-100"
              alt="thumbnail"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="col-md-8">
            <div className="card-body">
              <p className="badge bg-primary">Thu Jul 28th, 2022</p>
              <h5 className="card-title">
                <strong>World Nature Conservation Day</strong>
              </h5>
              <h6
                className={`card-text`}
                style={{ color: isdarkMode ? "white" : "#003300" }}
              >
                World Nature Conservation Day is observed on 28 July every year
                to recognise that a healthy environment is a foundation for a
                stable and productive society and for future generations. We
                must protect, conserve and sustainably manage our natural
                resources.
                <Link to="/login?create_blog">Create Post</Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`card mb-3 bg-${isdarkMode ? "dark" : "light"} text-${
          isdarkMode ? "white" : "black"
        }`}
        style={{ minWidth: "260px" }}
      >
        <div className="row g-0 p-2">
          <div
            className="col-md-4"
            style={{
              minHeight: "150px",
              maxHeight: "170px",
              overflow: "hidden",
            }}
          >
            <img
              src="https://source.unsplash.com/featured?hospital"
              className="w-100 h-100"
              alt="thumbnail"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="col-md-8">
            <div className="card-body">
              <p className="badge bg-primary">Thu Jul 28th, 2022</p>
              <h5 className="card-title">
                <strong>World Hepatitis Day</strong>
              </h5>
              <h6
                className={`card-text`}
                style={{ color: isdarkMode ? "white" : "#003300" }}
              >
                World Hepatitis Day is an important day that increases awareness
                about this condition. It is no exaggeration to say that days
                like this can help save lives. After all, by increasing
                awareness, we could end up reaching one person who goes and sees
                a doctor, and that could be the difference for them!
                <Link to="/login?create_blog">Create Post</Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todays;
