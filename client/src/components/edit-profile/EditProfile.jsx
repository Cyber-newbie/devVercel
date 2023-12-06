import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListFieldGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import isEmpty from "../../validation/is-empty";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import { connect } from "react-redux";
let render = 0;
const EditProfile = (props) => {
  const navigate = useNavigate();

  const { getCurrentProfile } = props;
  const [errors, setErrors] = useState({ ...props.error });
  const [useProfile, setUseProfile] = useState({ ...props.profile.profile });

  useEffect(() => {
    getCurrentProfile();
  }, []);

  useEffect(() => {
    if (props.profile.profile) {
      //make a copy of profile
      const oldProfile = props.profile.profile;
      // join the skill array as comma separated
      const skillsCSV = oldProfile.skills.join(",");
      const updatedProfile = {
        handle: !isEmpty(oldProfile.handle) ? oldProfile.handle : "",
        status: !isEmpty(oldProfile.status) ? oldProfile.status : "",
        company: !isEmpty(oldProfile.company) ? oldProfile.company : "",
        website: !isEmpty(oldProfile.website) ? oldProfile.website : "",
        location: !isEmpty(oldProfile.location) ? oldProfile.location : "",
        skills: skillsCSV,
        githubusername: !isEmpty(oldProfile.githubusername)
          ? oldProfile.githubusername
          : "",
        bio: !isEmpty(oldProfile.bio) ? oldProfile.bio : "",
        twitter: !isEmpty(oldProfile.twitter) ? oldProfile.twitter : "",
        facebook: !isEmpty(oldProfile.facebook) ? oldProfile.facebook : "",
        linkedin: !isEmpty(oldProfile.linkedin) ? oldProfile.linkedin : "",
        youtube: !isEmpty(oldProfile.youtube) ? oldProfile.youtube : "",
        instagram: !isEmpty(oldProfile.instagram) ? oldProfile.instagram : "",
      };
      setUseProfile({ ...updatedProfile });
    }
  }, [props.profile]);
  useEffect(() => {
    render = render + 1;

    if (props.error) {
      setErrors((prevErrors) => ({ ...prevErrors, ...props.error }));
    }
  }, [props.error]);

  const handle = useRef(null);
  const company = useRef(null);
  const website = useRef(null);
  const location = useRef(null);
  const status = useRef(null);
  const skills = useRef(null);
  const githubusername = useRef(null);
  const bio = useRef(null);
  const twitter = useRef(null);
  const facebook = useRef(null);
  const linkedin = useRef(null);
  const youtube = useRef(null);
  const instagram = useRef(null);
  const [displaySocialInputs, setdisplaySocialInput] = useState(false);
  let socialInputs;

  const handleHandler = (e) => {
    handle.current.value = e.target.value;
  };

  const companyHandler = (e) => {
    company.current.value = e.target.value;
  };

  const websiteHandler = (e) => {
    website.current.value = e.target.value;
  };

  const locationHandler = (e) => {
    location.current.value = e.target.value;
  };

  const skillsHandler = (e) => {
    skills.current.value = e.target.value;
  };

  const gitHandler = (e) => {
    githubusername.current.value = e.target.value;
  };

  const bioHandler = (e) => {
    bio.current.value = e.target.value;
  };

  const statusHandler = (e) => {
    status.current.value = e.target.value;
  };

  const socialHandler = () => {
    setdisplaySocialInput(true);
  };

  const twitterHandler = (e) => {
    twitter.current.value = e.target.value;
  };

  const facebookHandler = (e) => {
    facebook.current.value = e.target.value;
  };

  const youtubeHandler = (e) => {
    youtube.current.value = e.target.value;
  };

  const instagramHandler = (e) => {
    instagram.current.value = e.target.value;
  };

  const linkedinHandler = (e) => {
    linkedin.current.value = e.target.value;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const profileData = {
      handle: handle.current.value,
      company: company.current.value,
      website: website.current.value,
      location: location.current.value,
      status: status.current.value,
      skills: skills.current.value,
      githubusername: githubusername.current.value,
      bio: bio.current.value,
      twitter: twitter.current ? twitter.current.value : "",
      facebook: facebook.current ? facebook.current.value : "",
      linkedin: linkedin.current ? linkedin.current.value : "",
      youtube: youtube.current ? youtube.current.value : "",
      instagram: instagram.current ? instagram.current.value : "",
    };

    props.createProfile(profileData);

    navigate("/dashboard");
  };

  // Select options for status
  const options = [
    { label: "* Select Professional Status", value: "" },
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "Other", value: "Other" },
  ];

  //social inputs
  if (displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          ref={twitter}
          onChange={twitterHandler}
          error={errors["social.twitter"]}
          defaultValue={useProfile.twitter}
        />

        <InputGroup
          placeholder="Facebook Page URL"
          name="facebook"
          icon="fab fa-facebook"
          ref={facebook}
          onChange={facebookHandler}
          error={errors["social.facebook"]}
          defaultValue={useProfile.facebook}
        />

        <InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          ref={linkedin}
          onChange={linkedinHandler}
          error={errors["social.linkedin"]}
          defaultValue={useProfile.linkedin}
        />

        <InputGroup
          placeholder="YouTube Channel URL"
          name="youtube"
          icon="fab fa-youtube"
          ref={youtube}
          onChange={youtubeHandler}
          error={errors["social.youtube"]}
          defaultValue={useProfile.youtube}
        />

        <InputGroup
          placeholder="Instagram Page URL"
          name="instagram"
          icon="fab fa-instagram"
          ref={instagram}
          onChange={instagramHandler}
          error={errors.instagram}
          defaultValue={useProfile.instagram}
        />
      </div>
    );
  }

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={"/dashboard"} className="btn btn-light">
              {" "}
              Go Back{" "}
            </Link>
            <h1 className="display-4 text-center">Edit Your Profile</h1>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={submitHandler}>
              <TextFieldGroup
                type="text"
                placeholder="* Profile Handle"
                name="handle"
                onChange={handleHandler}
                ref={handle}
                defaultValue={useProfile.handle}
                error={errors.handle}
                info="Please use unique handle name"
              />
              <SelectListFieldGroup
                placeholder="* Status"
                name="Status"
                onChange={statusHandler}
                ref={status}
                options={options}
                error={errors.status}
                value={useProfile.status}
                info="where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                ref={company}
                onChange={companyHandler}
                error={errors.company}
                defaultValue={useProfile.company}
                info="Could be your own company or one you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                ref={website}
                onChange={websiteHandler}
                error={errors.website}
                defaultValue={useProfile.website}
                info="Could be your own website or a company one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                ref={location}
                onChange={locationHandler}
                error={errors.location}
                defaultValue={useProfile.location}
                info="City or city & state suggested (eg. Boston, MA)"
              />
              <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                ref={skills}
                onChange={skillsHandler}
                error={errors.skills}
                defaultValue={useProfile.skills}
                info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                ref={githubusername}
                onChange={gitHandler}
                error={errors.githubusername}
                defaultValue={useProfile.githubusername}
                info="If you want your latest repos and a Github link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                ref={bio}
                onChange={bioHandler}
                error={errors.bio}
                defaultValue={useProfile.bio}
                info="Tell us a little about yourself"
              />
              <div className="mb-3">
                <button
                  type="button"
                  onClick={socialHandler}
                  className="btn btn-light"
                >
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  error: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
);
