import React from "react";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";

const Profilesitem = (props) => {
  const profile = props.profile;
  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-2">
          <img src={profile.user.avatar} alt="" />
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          <h3>{profile.user.name}</h3>
          <p>
            {profile.status}{" "}
            {isEmpty(profile.company) ? null : (
              <span>at {profile.company}</span>
            )}
          </p>
          <p>
            {isEmpty(profile.location) ? null : <span>{profile.location}</span>}
          </p>
          <Link to={`/profile/${profile.handle}`} className="btn btn-info">
            View Profile
          </Link>
        </div>
        <div className="col-md-4 d-none d-md-block">
          <h4>Skill Set</h4>
          <ul className="group-list">
            {profile.skills.slice(0, 4).map((skill, index) => (
              <li key={index} className="group-list-item">
                <i className="fa fa-check pr-1"></i>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profilesitem;
