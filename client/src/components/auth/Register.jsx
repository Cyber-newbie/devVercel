import { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

const Register = (props) => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({ ...props.errors });
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const pswInput = useRef(null);
  const pswInput2 = useRef(null);

  useEffect(() => {
    if (props.errors) {
      setErrors((prevErrors) => ({ ...prevErrors, ...props.errors }));
    }
  }, [props.errors]);

  const nameHandler = (e) => {
    nameInput.current.value = e.target.value;
  };

  const emailHandler = (e) => {
    emailInput.current.value = e.target.value;
  };

  const pswdHandler = (e) => {
    pswInput.current.value = e.target.value;
  };

  const pswd2Handler = (e) => {
    pswInput2.current.value = e.target.value;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: nameInput.current.value,
      email: emailInput.current.value,
      password: pswInput.current.value,
    };

    if (data.password !== pswInput2.current.value) {
      return setErrors((prevErrors) => ({
        ...prevErrors,
        ...props.errors,
        confirmpswd: "password do not match",
      }));
    }

    props.registerUser(data, navigate);

    nameInput.current.value = "";
    emailInput.current.value = "";
    pswInput.current.value = "";
    pswInput2.current.value = "";
  };

  return (
    <div className="register">
      <div className="container">
        <div className="mx-auto max-w-md">
          <h1 className="text-4xl font-bold text-center mb-4">Sign Up</h1>
          <p className="text-lg text-center mb-6">
            Create your NewsRead account
          </p>
          <form onSubmit={submitHandler}>
            <TextFieldGroup
              placeholder="Name"
              name="name"
              ref={nameInput}
              onChange={nameHandler}
              error={errors.name}
            />

            <TextFieldGroup
              type="email"
              placeholder="Email Address"
              name="email"
              ref={emailInput}
              onChange={emailHandler}
              error={errors.email}
              info="This site uses Gravatar so if you want a profile image, use a
           Gravatar email"
            />

            <TextFieldGroup
              placeholder="Password"
              name="password"
              ref={pswInput}
              onChange={pswdHandler}
              error={errors.password}
              type="password"
            />

            <TextFieldGroup
              placeholder="Confirm Password"
              name="password"
              ref={pswInput2}
              onChange={pswd2Handler}
              error={errors.confirmpswd}
              type="password"
            />

            <button
              type="submit"
              className="btn btn-info btn-block mt-4 text-white font-bold py-2 px-4 w-full rounded mt-4"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(Register);
