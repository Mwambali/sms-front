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