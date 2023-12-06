import "./App.css";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import store from "./store";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import ProtectedRoute from "./helper/ProtectedRoute";
import Post from "./components/post/Post";

//check token and then set the user
if (localStorage.jwtToken) {
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    //clear current profile
    store.dispatch(clearCurrentProfile());
    //redirect
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />{" "}
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/register" element={<Register />} />{" "}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            path="/create-profile"
            element={
              <ProtectedRoute>
                <CreateProfile />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            path="/add-experience"
            element={
              <ProtectedRoute>
                <AddExperience />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            path="/add-education"
            element={
              <ProtectedRoute>
                <AddEducation />
              </ProtectedRoute>
            }
          />{" "}
          <Route path="/profiles" element={<Profiles />} />{" "}
          <Route path="/profile/:handle" element={<Profile />} />{" "}
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            }
          />{" "}
          <Route exact path="/not-found" element={<NotFound />} />{" "}
        </Routes>{" "}
        <Footer />
      </Router>{" "}
    </Provider>
  );
}

export default App;
