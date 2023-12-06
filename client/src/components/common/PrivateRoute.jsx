import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Fragment } from "react";
function PrivateRoute({ component: Component, ...rest }, props) {
  //   const Navigate = useNavigate();
  const { isAuthenticated } = props.auth;
  if (isAuthenticated) {
    console.log("routing");
    return <Route {...rest} />;
   
  } else {
    return <Navigate to="/login" replace={true} />;
  }
  //   return isAuthenticated ? (
  //     <Routes>
  //       <Route {...rest} />
  //     </Routes>
  //   ) : (
  //     <Navigate to="/login" replace />
  //   );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.errors,
});

export default connect(mapStateToProps)(PrivateRoute);
