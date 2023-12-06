import React, { useEffect, useRef, useState } from "react";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
const PostForm = (props) => {
  const text = useRef(null);
  const [errors, setErrors] = useState({ ...props.errors });

  const changeHandler = (e) => {
    text.current.value = e.target.value;
  };

  useEffect(() => {
    if (props.errors) {
      setErrors((prevErrors) => ({ ...prevErrors, ...props.errors }));
    }
  }, [props.errors]);

  const submitHandler = (e) => {
    e.preventDefault();
    let { user } = props.auth;
    let postData = {
      text: text.current.value,
      name: user.name,
      avatar: user.avatar,
    };
    props.addPost(postData);
    setErrors({});
    text.current.value = "";
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Somthing...</div>
        <div className="card-body">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Create a post"
                name="text"
                ref={text}
                onChange={changeHandler}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
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

export default connect(mapStateToProps, { addPost })(PostForm);
