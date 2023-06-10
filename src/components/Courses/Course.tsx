import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourses, selectCourses } from "../../store/reducers/courseReducer";
import { AppDispatch } from "../../store";
import AppNavbar from "../AppNavbar";

const Courses: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const courses = useSelector(selectCourses);

    useEffect(() => {
        dispatch(getCourses());
    }, [dispatch]);

    return (
        <div className="container">
            <div className="student__wrapper">
                <AppNavbar />

                <div className="classes__wrapper">
                    {courses.length > 0 ? (
                        <ul className="allClasses">
                            {courses.map(({ courseName, id }, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={`/about-course/${id}`}>
                                            {courseName}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div>
                            <h3>No Course Available</h3>
                            <br />
                            <Link to="/create-course">Create a course</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Courses;





// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import AppNavbar from "../AppNavbar";
// import { RootState } from "../../store";

// const Courses: React.FC = () => {
//     const { courses } = useSelector((state: RootState) => state.cou);

//     return (
//         <div className="container">
//             <div className="student__wrapper">
//                 <AppNavbar />

//                 <div className="classes__wrapper">
//                     {courses.length > 0 ? (
//                         <ul className="allClasses">
//                             {courses.map(({ course_name, slug }, id) => {
//                                 return (
//                                     <li key={id}>
//                                         <Link to={`/about-course/${slug}`}>
//                                             {course_name.toUpperCase()}
//                                         </Link>
//                                     </li>
//                                 );
//                             })}
//                         </ul>
//                     ) : (
//                         <div>
//                             <h3>No Course Available</h3>
//                             <br />
//                             <Link to="/create-course">Create a course</Link>
//                         </div>
//                     )}
//                     <div>
//                         <h3>No Course Available</h3>
//                         <br />
//                         <Link to="/create-course">Create a course</Link>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Courses;
