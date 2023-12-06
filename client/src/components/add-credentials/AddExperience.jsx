import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { GET_ERROR } from "../../type";
import { addExperience } from "../../actions/profileActions";
import { connect, useDispatch } from "react-redux";
function AddExperience(props) {
  const title = useRef(null);
  const company = useRef(null);
  const location = useRef(null);
  const from = useRef(null);
  const to = useRef(null);
  const [current, setCurrent] = useState(false);
  const description = useRef(null);
  const [disbaled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.error) {
      setErrors((prevErrors) => ({ ...prevErrors, ...props.error }));
    }
  }, [props.error]);

  useEffect(() => {
    return () => {
      dispatch({
        type: GET_ERROR,
        payload: {},
      });
    };
  }, []);
  const titleHandler = (e) => {
    title.current.value = e.target.value;
  };

  const companyHandler = (e) => {
    company.current.value = e.target.value;
  };

  const locationHandler = (e) => {
    location.current.value = e.target.value;
  };

  const fromHandler = (e) => {
    from.current.value = e.target.value;
  };

  const toHandler = (e) => {
    to.current.value = e.target.value;
  };

  const onCheck = (e) => {
    setCurrent((prevState) => !prevState);
    setDisabled((prevState) => !prevState);
  };

  const descriptionHandler = (e) => {
    description.current.value = e.target.value;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const addExp = {
      title: title.current.value,
      company: company.current.value,
      location: location.current.value,
      from: from.current.value,
      to: to.current.value,
      current,
      description: description.current.value,
    };

    props.addExperience(addExp, navigate);
  };

  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-9 mb-auto">
            <Link to={"/dashboard"} className="btn btn-light">
              {" "}
              Go Back{" "}
            </Link>
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">
              Add any job if you have had in the past or current
            </p>
            <small className="pb-3 d-block"> * = required fields </small>
            <form onSubmit={submitHandler}>
              <TextFieldGroup
                placeholder="* company"
                name="company"
                ref={company}
                onChange={companyHandler}
                error={errors.company}
              />
              <TextFieldGroup
                placeholder="* Job title"
                name="title"
                ref={title}
                onChange={titleHandler}
                error={errors.title}
              />
              <TextFieldGroup
                placeholder="location"
                name="location"
                ref={location}
                onChange={locationHandler}
                error={errors.location}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                placeholder="* from"
                name="from"
                type="date"
                ref={from}
                onChange={fromHandler}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                placeholder="to"
                name="to"
                type="date"
                ref={to}
                onChange={toHandler}
                error={errors.to}
                disabled={disbaled ? "disabled" : ""}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  onChange={onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="description"
                name="description"
                ref={description}
                onChange={descriptionHandler}
                error={errors.description}
                info="Tell us about the position"
              />
              <input
                type="submit"
                className="btn btn-info btn-block mt-4"
                defaultValue="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  error: state.errors,
});

export default connect(mapStateToProps, { addExperience })(AddExperience);
