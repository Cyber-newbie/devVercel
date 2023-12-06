import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProfileByHandle } from "../../actions/profileActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import ProfileAbout from "./ProfileAbout";
import Spinner from "../common/Spinner";

const Profile = (props) => {
  const { handle } = useParams();
  const navigate = useNavigate();
  let profileContent;

  useEffect(() => {
    props.getProfileByHandle(handle);
  }, []);
  const { profile, loading } = props.profile;
  const isFetchInProgress = loading && profile === null;
  useEffect(() => {
    console.log("isFetchInProgress:", isFetchInProgress);
    if (isFetchInProgress) {
      console.log("Fetch in progress, waiting...");
      return; // Wait until the fetch is complete
    }

    if (loading && profile === null) {
      console.log("Navigating to /not-found...");
      navigate("/not-found");
    }
    // if (profile === null) {
    //   console.log("Navigating to /not-found...");
    //   navigate("/not-found");
    // }
  }, [isFetchInProgress]);
  if (profile === null || loading) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back To Profiles
            </Link>
          </div>
          <div className="col-md-6" />
        </div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileCreds
          education={profile.education}
          experience={profile.experience}
        />
        {profile.githubusername ? (
          <ProfileGithub username={profile.githubusername} />
        ) : null}
      </div>
    );
  }

  return (
    <>
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  error: state.errors,
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
