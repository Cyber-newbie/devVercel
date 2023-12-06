import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { GET_ERROR } from "../../type";
import { addEducation } from "../../actions/profileActions";
import { connect, useDispatch } from "react-redux";
function AddEducation(props) {
  const school = useRef(null);
  const degree = useRef(null);
  const fieldofstudy = useRef(null);
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

  //Cleaning error state when component unmounts.
  useEffect(() => {
    return () => {
      dispatch({
        type: GET_ERROR,
        payload: {},
      });
    };
  }, []);
  const schoolHandler = (e) => {
    school.current.value = e.target.value;
  };

  const degreeHandler = (e) => {
    degree.current.value = e.target.value;
  };

  const fieldofstudyHandler = (e) => {
    fieldofstudy.current.value = e.target.value;
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
    const addEdu = {
      school: school.current.value,
      degree: degree.current.value,
      fieldofstudy: fieldofstudy.current.value,
      from: from.current.value,
      to: to.current.value,
      current,
      description: description.current.value,
    };

    props.addEducation(addEdu, navigate);
  };

  return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-9 mb-auto">
            <Link to={"/dashboard"} className="btn btn-light">
              {" "}
              Go Back{" "}
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add amy school,bootcamp, etc that you have attended
            </p>
            <small className="pb-3 d-block"> * = required fields </small>
            <form onSubmit={submitHandler}>
              <TextFieldGroup
                placeholder="* School"
                name="school"
                ref={school}
                onChange={schoolHandler}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder="* Degree"
                name="degree"
                ref={degree}
                onChange={degreeHandler}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder="Field of study"
                name="fieldofstudy"
                ref={fieldofstudy}
                onChange={fieldofstudyHandler}
                error={errors.fieldofstudy}
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
                  Current
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

export default connect(mapStateToProps, { addEducation })(AddEducation);
