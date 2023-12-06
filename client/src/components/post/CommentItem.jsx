import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";

const CommentItem = ({ comment, postId, auth, deleteComment }) => {
  const onDeleteClick = (postId, commentId) => {
    deleteComment(postId, commentId);
  };
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <Link to={`/profile/${comment.name}`}>
            <img
              className="rounded-circle d-none d-md-block"
              src={comment.avatar}
              alt=""
            />
          </Link>
          <br />
          <p className="text-center">{comment.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{comment.text}</p>
          {comment.user === auth.user.id ? (
            <button
              onClick={() => onDeleteClick(postId, comment._id)}
              type="button"
              className="btn btn-danger mr-1"
            >
              <i className="fas fa-times" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
