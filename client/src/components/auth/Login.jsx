// import {Link} from 'react-router-dom'
import { useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { CLEAR_ERROR } from "../../type";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({ ...props.errors });
  const { isAuthenticated } = props.auth;

  //on logging, check if the user is authenticated then navigate to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  //set redux errors to component state to show input error fields
  useEffect(() => {
    if (props.errors) {
      setErrors((prevErrors) => ({ ...prevErrors, ...props.errors }));
    }
  }, [props.errors]);

  //as component renders, clear up the component error state and redux error state
  useEffect(() => {
    dispatch({
      type: CLEAR_ERROR,
      payload: {},
    });
    setErrors({});
  }, []);

  const emailInput = useRef(null);
  const pswInput = useRef(null);

  const emailHandler = (e) => {
    emailInput.current.value = e.target.value;
  };

  const pswdHandler = (e) => {
    pswInput.current.value = e.target.value;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email: emailInput.current.value,
      password: pswInput.current.value,
    };

    props.loginUser(userData);
    setErrors({});
    emailInput.current.value = "";
    pswInput.current.value = "";
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign into your DevConnect account
            </p>
            <form onSubmit={submitHandler}>
              <TextFieldGroup
                type="email"
                name="email"
                placeholder="Email"
                ref={emailInput}
                onChange={emailHandler}
                error={errors.email}
              />

              <TextFieldGroup
                type="password"
                name="password"
                placeholder="password"
                ref={pswInput}
                onChange={pswdHandler}
                error={errors.password}
              />

              <input
                type="submit"
                className="btn btn-info btn-block mt-4"
                value="Log In"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
