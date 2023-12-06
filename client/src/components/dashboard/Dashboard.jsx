import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
const Dashboad = (props) => {
  const navigate = useNavigate();
  const { getCurrentProfile, deleteAccount } = props;
  const { isAuthenticated } = props.auth;
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      getCurrentProfile();
    }
  }, [isAuthenticated]);
  const onDeleteClick = () => {
    deleteAccount();
  };
  const { user } = props.auth;
  const { profile, loading } = props.profile;

  let dashboardContent;
  if (profile == null || loading) {
    dashboardContent = <Spinner />;
  } else {
    if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
          </p>
          <ProfileActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div style={{ marginBottom: "60px" }} />
          <button onClick={onDeleteClick} className="btn btn-danger">
            Delete My Account
          </button>
        </div>
      );
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not setup the profile yet, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="dashboard ">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboad
);
