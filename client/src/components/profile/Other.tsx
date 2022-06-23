import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getOtherInfo } from "../../redux/actions/userAction";
import { RootStore, IUser } from "../../utils/TypeScript";

import Loading from "../global/Loading";
import Follow from "./Follow";
import Following from "./OtherFollowings";
import UserBlogs from "./UserBlogs";
import Follower from "./OtherFollower";

interface IProps {
    id: string;
}

const Other: React.FC<IProps> = ({ id }) => {

    return (
        <>
            <nav >
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Blogs</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Followers</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Following</button>
                </div>
            </nav>
            <div className="tab-content my-3" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}><UserBlogs /></div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex={0}><Follower id={id} /></div>
                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex={0}><Following id={id} /></div>
            </div>
        </>
    );
};

export default Other;
