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
        <div className="row g-0 p-md-2">
          <div
            className="col-md-4"
            style={{
              minHeight: "150px",
              maxHeight: "170px",
              overflow: "hidden",
            }}
          >
            <img
              src="https://res.cloudinary.com/aababcab/image/upload/v1659064008/photo-1657703694099-36e632f986d6_c9ye88.jpg"
              className="w-100 h-100"
              alt="thumbnail"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="col-md-8">
            <div className="card-body">
              <p className="badge bg-primary">Thu Jul 29th, 2022</p>
              <h5 className="card-title">
                <strong>International Tiger Day</strong>
              </h5>
              <h6
                className={`card-text`}
                style={{ color: isdarkMode ? "white" : "#003300" }}
              >
                International Tiger Day is observed on 29th July to raise
                awareness for tiger conservation and first coined in 2010 at the
                Saint Petersburg Tiger Summit. The main significance of the day
                is to promote a global awareness for the protection of the
                natural habitats of tigers and to raise public awareness and
                support for tiger conservation issues.
                <Link to="/login?create_blog">Create Post Feature on Top</Link>
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
        <div className="row g-0 p-md-2">
          <div
            className="col-md-4"
            style={{
              minHeight: "150px",
              maxHeight: "170px",
              overflow: "hidden",
            }}
          >
            <img
              src="https://res.cloudinary.com/aababcab/image/upload/v1659009872/blog/zctgu3itkqenocuehvj6.jpg"
              className="w-100 h-100"
              alt="thumbnail"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="col-md-8">
            <div className="card-body">
              <p className="badge bg-primary">Thu Jul 29th, 2022</p>
              <h5 className="card-title">
                <strong>Rain Day</strong>
              </h5>
              <h6
                className={`card-text`}
                style={{ color: isdarkMode ? "white" : "#003300" }}
              >
                There probably would have been no life without rain, and that’s
                why we celebrate Rain Day on July 29. Various people and
                cultures have celebrated rain and its life-giving power through
                prayers, arts and music, folklore, and more. Rain doesn’t just
                water our trees and makes the earth fresh and green, the first
                spells of the shower after a long stretch of summer brings us so
                much joy! If you are lucky enough to get some rain on Rain Day,
                head outside to dance, walk, or sing in the rain. Today is the
                perfect day to feel grateful for the lovely planet that we live
                in and its many miracles.
                <Link to="/login?create_blog"> Create Post Feature on Top</Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todays;
