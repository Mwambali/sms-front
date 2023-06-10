import React, { /*useEffect*/ } from "react";
import { Provider, useSelector, /*useDispatch*/ } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
import { RootState, /*AppDispatch,*/ store } from "./store";
import { getClasses } from "./store/reducers/classReducer";
import { getCourses } from "./store/reducers/courseReducer";

import { getStudents } from "./store/reducers/studentReducer";

/* Css */
import "./styles.css";

/* Components */
import AppNavbar from "./components/AppNavbar";

/* Courses */
import AdminCourse from "./components/Courses/AdminCourse";
import UpdateCourse from "./components/Courses/UpdateCourse";
import ViewCourse from "./components/Views/ViewCourse";

/* Classes */
import AdminClass from "./components/Classes/AdminClass";
import UpdateClass from "./components/Classes/UpdateClass";
import Classes from "./components/Classes/Classes";
import ViewClass from "./components/Views/ViewClass";

/* Students */
import AdminStudent from "./components/Student/AdminStudent";
import Students from "./components/Student/Student";
import UpdateStudent from "./components/Student/UpdateStudent";
import ViewStudent from "./components/Views/ViewStudent";

//auth
import SigninPage from "./pages/Signin.page";
import RegisterPage from "./pages/Register.page";
import Courses from "./components/Courses/Course";

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

// /* Get Datas */
store.dispatch(getStudents());
store.dispatch(getClasses());
store.dispatch(getCourses());


const HomeComponent: React.FC = () => {
  const { courses } = useSelector((state: RootState) => state.course);

  return (
    <div className="container">
      <AppNavbar />
      <div className="home__wrapper">
        <div className="home__left">
          <img src={avatar} alt="Avatar" />

          <h1>App Actions</h1>
          <ul>
            <li>Create & Manage Courses</li>
            <li>Create & Manage Classes</li>
            <li>Create & Manage Students</li>
          </ul>
        </div>

        <div className="home__actions">
          {courses.length > 0 ? (
            <>
              <div className="home__action">
                <Link to="/create-course">
                  <button>Create a course</button>
                </Link>
              </div>
              <div className="home__action">
                <Link to="/create-class">
                  <button>Create a class</button>
                </Link>
              </div>
              <div className="home__action">
                <Link to="/create-student">
                  <button>Add a student</button>
                </Link>
              </div>
              <div className="home__manager">
                <Link to="/students">Manage Students</Link>
                <Link to="/classes">Manage Classes</Link>
                <Link to="/courses">Manage Courses</Link>
              </div>
            </>
          ) : (
            <div>
              <h3>No Course Available</h3>
              <Link to="/create-course">
                <h4>Create a Course</h4>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   dispatch(getStudents());
  //   dispatch(getClasses());
  //   dispatch(getCourses());
  // }, [dispatch]);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/create-class" element={<AdminClass />} />
          <Route path="/create-student" element={<AdminStudent />} />
          <Route path="/create-course" element={<AdminCourse />} />
          <Route path="/students" element={<Students />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/class/update/:id" element={<UpdateClass />} />
          <Route path="/student/update/:id" element={<UpdateStudent />} />
          <Route path="/course/update/:id" element={<UpdateCourse />} />
          <Route path="/about-course/:id" element={<ViewCourse />} />
          <Route path="/about-class/:id" element={<ViewClass />} />
          <Route path="/about-student/:id" element={<ViewStudent />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/" element={<HomeComponent />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;