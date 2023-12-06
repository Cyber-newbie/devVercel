import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profileActions";
import Profilesitem from "./Profilesitem";
import Spinner from "../common/Spinner";
const Profiles = (props) => {
  //   const { getProfiles } = props;
  useEffect(() => {
    props.getProfiles();
  }, []);
  const { profiles, loading } = props.profile;
  //   console.log(`all the profiles: ${profiles}`);
  let profileItem;
  if (profiles === null || loading === true) {
    profileItem = <Spinner />;
  } else {
    if (profiles.length > 0) {
      profileItem = profiles.map((profile) => (
        <Profilesitem key={profile._id} profile={profile} />
      ));
      //   profileItem = <h4>PROFILES FOUND</h4>;
    } else {
      profileItem = <h4>NO PROFILES FOUND</h4>;
    }
  }
  //   console.log(profiles);
  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4 className="display-4  text-center">Developer Profiles</h4>
            <p className="lead text-center">
              Browse and connect with developers
            </p>
            {profileItem}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
