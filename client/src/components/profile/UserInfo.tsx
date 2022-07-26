import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  RootStore,
  InputChange,
  IUserProfile,
  FormSubmit,
} from "../../utils/TypeScript";

import NotFound from "../global/NotFound";

import { updateUser, resetPassword } from "../../redux/actions/userAction";
import Monetary from "./Monetary";
import Tick from "./Tick";
import Helmetglobal from "../global/Helmetglobal";

const UserInfo = () => {
  const initState = {
    name: "",
    account: "",
    avatar: "",
    password: "",
    cf_password: "",
    about: "",
    referer: "",
    country: "",
    city: "",
    state: "",
    locality: "",
    gender: "",
  };

  const { auth, darkMode } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { isdarkMode } = darkMode;
  const [user, setUser] = useState<IUserProfile>(initState);
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleChangeFile = (e: InputChange) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files) {
      const file = files[0];
      setUser({ ...user, avatar: file });
    }
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (avatar || name || about)
      dispatch(updateUser(avatar as File, name, about, auth));

    if (password && auth.access_token)
      dispatch(resetPassword(password, cf_password, auth.access_token));
  };

  const { name, avatar, password, cf_password, about } = user;

  if (!auth.user) return <NotFound />;

  return (
    <>
      <div
        className={`profile_info position-relative bg-${isdarkMode ? "dark" : "light"
          }`}
      >
        <Helmetglobal
          title={auth.user.name}
          description={auth.user.about}
          keyword="social profile"
        />
        <div className="position-absolute" style={{ right: 3, top: 3 }}>
          <Monetary />
        </div>
        <button
          type="button"
          className={`btn btn-${isdarkMode ? "light" : "dark"
            } rounded-circle position-absolute`}
          style={{ left: 3, top: 3 }}
          data-bs-toggle="modal"
          data-bs-target="#profileModal"
        >
          <i
            className={`fas fa-user-edit text-${isdarkMode ? "dark" : "light"}`}
          ></i>
        </button>
        <div className="text-center">
          <div className="info_avatar">
            <img src={auth.user.avatar} alt="avatar" />
          </div>
          <Tick role={auth.user.role} />

          <div className={`mt-1 text-${isdarkMode ? "white" : "black"}`}>
            Name: <span className="text-info">{auth.user.name}</span>
          </div>

          <div className={`text-${isdarkMode ? "white" : "black"}`}>
            Email: <span className={`text-info `}>{auth.user.account}</span>
          </div>
          <div className={`text-${isdarkMode ? "white" : "black"}`}>
            {auth.user.about}
          </div>

          <div className="row mt-3 mb-1" style={{ textAlign: "center" }}>
            <div className="col-6">
              <b className={`text-${isdarkMode ? "white" : "black"}`}>
                Followers
              </b>
              <p className={`text-${isdarkMode ? "white" : "black"}`}>
                {auth.user.follower.length}
              </p>
            </div>
            <div className="col-6">
              <b className={`text-${isdarkMode ? "white" : "black"}`}>
                Following
              </b>
              <p className={`text-${isdarkMode ? "white" : "black"}`}>
                {auth.user.following.length}
              </p>
            </div>
          </div>
          <br />
          <br />
          <div
            className={`bg-${isdarkMode ? "dark" : "white"} text-${isdarkMode ? "white" : "black"
              }`}
            style={{ display: "inline" }}
          >
            Join Date:{" "}
            <span style={{ color: "#ffc107" }}>
              {new Date(auth.user.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="profileModal"
        tabIndex={-1}
        aria-labelledby="profileModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={handleSubmit} className="container">
          <div className="modal-dialog">
            <div className="modal-content">
              <div
                className={`modal-header bg-${isdarkMode ? "dark" : "light"}`}
              >
                <h5
                  className={`modal-title text-${isdarkMode ? "white" : "black"
                    }`}
                  id="profileModalLabel"
                >
                  Update Profile
                </h5>
                <button
                  type="button"
                  className={`btn-close btn-close-${isdarkMode ? "white" : "dark"
                    }`}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div
                className={`modal-body profile_info position-relative bg-${isdarkMode ? "dark" : "light"
                  }`}
                style={{ height: "calc(100vh -350px)", overflow: "scroll" }}
              >
                <nav>
                  <div
                    className="nav nav-pills nav-fill mb-1"
                    id="Profile-nav"
                    role="tablist"
                  >
                    <button
                      className="nav-link active"
                      id="basic-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#basic"
                      type="button"
                      role="tab"
                      aria-controls="search-all"
                      aria-selected="true"
                    >
                      Basic
                    </button>
                    {/* <button
                      className="nav-link"
                      id="other-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#other"
                      type="button"
                      role="tab"
                      aria-controls="seacrh-blog"
                      aria-selected="false"
                    >
                      More Info
                    </button> */}
                    {/* <button
                      className="nav-link"
                      id="location-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#location"
                      type="button"
                      role="tab"
                      aria-controls="search-user"
                      aria-selected="false"
                    >
                      Home Town
                    </button> */}
                    <button
                      className="nav-link"
                      id="password-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#password"
                      type="button"
                      role="tab"
                      aria-controls="search-category"
                      aria-selected="false"
                    >
                      Password
                    </button>
                  </div>
                </nav>
                <div
                  className="tab-content example my-3 position-relative pt-2 px-1 w-100 rounded mt-2"
                  id="nav-tabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="basic"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                    tabIndex={0}
                  >
                    <div className="container">
                      <div className="info_avatar">
                        <img
                          src={
                            avatar
                              ? URL.createObjectURL(avatar)
                              : auth.user.avatar
                          }
                          alt="avatar"
                        />

                        <span>
                          <i className="fas fa-camera" />
                          <p>Change</p>
                          <input
                            type="file"
                            accept="image/*"
                            name="file"
                            id="file_up"
                            onChange={handleChangeFile}
                          />
                        </span>
                      </div>
                      <div
                        className={`form-group my-3 text-${isdarkMode ? "white" : "black"
                          }`}
                      >
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          defaultValue={auth.user.name}
                          onChange={handleChangeInput}
                        />
                      </div>

                      <div
                        className={`form-group my-3 text-${isdarkMode ? "white" : "black"
                          }`}
                      >
                        <label htmlFor="account">Account</label>
                        <input
                          type="text"
                          className="form-control"
                          id="account"
                          name="account"
                          defaultValue={auth.user.account}
                          onChange={handleChangeInput}
                          disabled={true}
                        />
                      </div>

                      <div
                        className={`form-group my-3 text-${isdarkMode ? "white" : "black"
                          }`}
                      >
                        <label htmlFor="about">About</label>
                        <textarea
                          className="form-control"
                          id="about"
                          name="about"
                          defaultValue={auth.user.about}
                          onChange={handleChangeInput}
                          rows={4}
                          maxLength={200}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  {/* <div
                    className="tab-pane fade"
                    id="other"
                    role="tabpanel"
                    aria-labelledby="nav-drafts-tab"
                    tabIndex={0}
                  >
                    <div className="container">
                      <div
                        className={`form-group my-3 text-${
                          isdarkMode ? "white" : "black"
                        }`}
                      >
                        <label htmlFor="gender">Gender</label>

                        <select
                          id="gender"
                          className="form-control"
                          name="gender"
                          defaultValue={auth.user.gender}
                          onChange={handleChangeInput}
                        >
                          <option>Select Gender</option>
                          <option value="m">Male</option>
                          <option value="f">Female</option>
                          <option value="n">Not Specify</option>
                        </select>
                      </div>
                      <div
                        className={`form-group my-3 text-${
                          isdarkMode ? "white" : "black"
                        }`}
                      >
                        <label htmlFor="bd">Date Of Birth</label>

                        <input
                          id="bd"
                          className="form-control"
                          type="date"
                          name="birthday"
                          onChange={handleChangeInput}
                        />
                        <span
                          id="startDateSelected"
                          style={{ cursor: "pointer" }}
                        ></span>
                      </div>
                      <div
                        className={`form-group my-3 text-${
                          isdarkMode ? "white" : "black"
                        }`}
                      >
                        <label id="worklabel" htmlFor="work">
                          I am a
                        </label>
                        <input
                          autoComplete="off"
                          id="work"
                          name="work"
                          type="text"
                          className="form-control me-2 w-100"
                          value={catname}
                          placeholder="I am a ..."
                          onFocus={(e) => showhide()}
                          onChange={(e) => setCatname(e.target.value)}
                          defaultValue={auth.user.working}
                        />
                      </div>
                      <div
                        className="container pt-2 px-1 w-100 rounded position-relative"
                        id="app"
                        style={{
                          marginTop: 2,
                          background: "#cbcaca",
                          zIndex: 10,
                          maxHeight: "calc(100vh - 100px)",
                          maxWidth: 450,
                          overflow: "auto",
                          paddingBottom: 3,
                          display: "none",
                        }}
                      >
                        <span
                          className="btn btn-secondary p-1 position-absolute px-3"
                          style={{ right: 5 }}
                          onClick={(e) => {
                            close();
                          }}
                        >
                          &times;
                        </span>

                        {categor.length ? (
                          <p style={{ color: "black" }}>Select One...</p>
                        ) : (
                          <></>
                        )}
                        {categor.length === 0 ? (
                          <button
                            className="btn btn-light py-2 m-1 pb-2"
                            onClick={(e) => addcat()}
                          >
                            Add Category
                          </button>
                        ) : (
                          categor.map((category) => (
                            <span
                              className="btn btn-success py-1 m-1"
                              key={category._id}
                              id={category._id}
                              onClick={(e) => {
                                handleChangeCat(e);
                              }}
                            >
                              {category.name}
                            </span>
                          ))
                        )}
                      </div>
                      <div
                        className={`form-group my-3 text-${
                          isdarkMode ? "white" : "black"
                        }`}
                      >
                        <label id="country" htmlFor="password">
                          I Want to be a
                        </label>
                        <select className="form-control">
                          <option>Select Goal</option>
                          <option value="">India</option>
                          <option value="f">Female</option>
                          <option value="n">Not Specify</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="location"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                    tabIndex={0}
                  >
                    <div className="container">
                      <div
                        className={`form-group my-3 text-${
                          isdarkMode ? "white" : "black"
                        }`}
                      >
                        <label id="country" htmlFor="country">
                          Country
                        </label>
                        <select
                          className="form-control"
                          id="country"
                          name="country"
                          defaultValue={auth.user.country}
                          onChange={handleChangeInput}
                        >
                          <option disabled>Select Country</option>
                          <option value="">India</option>
                          <option value="f">Female</option>
                          <option value="n">Not Specify</option>
                        </select>
                      </div>
                      <div
                        className={`form-group my-3 text-${
                          isdarkMode ? "white" : "black"
                        }`}
                      >
                        <label htmlFor="state">State</label>

                        <select
                          className="form-control"
                          id="state"
                          name="state"
                          defaultValue={auth.user.state}
                          onChange={handleChangeInput}
                        >
                          <option>Select State</option>
                          <option value="m">Male</option>
                          <option value="f">Female</option>
                          <option value="n">Not Specify</option>
                        </select>
                      </div>
                      <div
                        className={`form-group my-3 text-${
                          isdarkMode ? "white" : "black"
                        }`}
                      >
                        <label htmlFor="city">City</label>

                        <select
                          className="form-control"
                          id="city"
                          name="city"
                          defaultValue={auth.user.city}
                          onChange={handleChangeInput}
                        >
                          <option disabled>Select city</option>
                          <option value="m">Male</option>
                          <option value="f">Female</option>
                          <option value="n">Not Specify</option>
                        </select>
                      </div>
                      <div
                        className={`form-group my-3 text-${
                          isdarkMode ? "white" : "black"
                        }`}
                      >
                        <label htmlFor="locality">Locality</label>

                        <input
                          type="text"
                          className="form-control"
                          id="locality"
                          name="locality"
                          defaultValue={auth.user.locality}
                          onChange={handleChangeInput}
                          placeholder="Enter your landmark."
                        />
                      </div>
                    </div>
                  </div> */}
                  <div
                    className="tab-pane fade"
                    id="password"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                    tabIndex={0}
                  >
                    <div className="container">
                      {auth.user.type !== "register" && (
                        <small className="text-danger">
                          * Quick login account with {auth.user.type} can't use
                          this function *
                        </small>
                      )}
                      <div
                        className={`form-group my-3 text-${isdarkMode ? "white" : "black"
                          }`}
                      >
                        <label htmlFor="password">Password</label>

                        <div className="pass">
                          <input
                            type={typePass ? "text" : "password"}
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChangeInput}
                            disabled={auth.user.type !== "register"}
                          />

                          <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? "Hide" : "Show"}
                          </small>
                        </div>
                      </div>

                      <div
                        className={`form-group my-3 text-${isdarkMode ? "white" : "black"
                          }`}
                      >
                        <label htmlFor="cf_password">Confirm Password</label>

                        <div className="pass">
                          <input
                            type={typeCfPass ? "text" : "password"}
                            className="form-control"
                            id="cf_password"
                            name="cf_password"
                            value={cf_password}
                            onChange={handleChangeInput}
                            disabled={auth.user.type !== "register"}
                          />

                          <small onClick={() => setTypeCfPass(!typeCfPass)}>
                            {typeCfPass ? "Hide" : "Show"}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className={`btn btn-${isdarkMode ? "primary" : "dark"} w-100`}
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserInfo;
