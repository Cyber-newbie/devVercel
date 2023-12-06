import React, { useEffect } from "react";
import { getPost } from "../../actions/postActions";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Spinner from "../common/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

const Post = (props) => {
  const { getPost } = props;
  useEffect(() => {
    getPost(id);
  }, []);
  let postContent;
  const { post, loading } = props.post;
  const { id } = useParams();

  if (post === null || loading || Object.keys(post).length === 0) {
    postContent = <Spinner />;
  } else {
    postContent = (
      <div>
        <PostItem post={post} showActions={false} />
      </div>
    );
  }
  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link className="btn btn-light mb-3" to={"/feed"}>
              Back to feed
            </Link>
            {postContent}
            <CommentForm postId={id} />
            {post.comments ? (
              <CommentFeed comments={post.comments} postId={post._id} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost })(Post);
