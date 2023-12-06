import React, { useEffect } from "react";
import PostForm from "./PostForm";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import PostFeed from "./PostFeed";
const Posts = (props) => {
  let postContent;
  //fetch all post when the component mounts...
  useEffect(() => {
    props.getPosts();
  }, []);

  const { posts, loading } = props.post;

  if (posts === null || loading) {
    postContent = <Spinner />;
  } else {
    postContent = <PostFeed posts={posts} />;
  }
  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Posts);
