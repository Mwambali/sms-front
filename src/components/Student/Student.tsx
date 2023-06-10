import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import {
    getStudents,
    selectStudents,
    selectCreatedStatus,
} from "../../store/reducers/studentReducer";
import { AppDispatch } from "../../store";

const Students: React.FC = () => {
    const students = useSelector(selectStudents);
    const createdStatus = useSelector(selectCreatedStatus);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getStudents());
    }, [dispatch]);

    return (
        <div className="container">
            <div className="student__wrapper students__cover">
                <AppNavbar />

                {students && students.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Class</th>
                                <th>Courses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(
                                (
                                    {
                                        studentName,
                                        studentAge,
                                        studentClass,
                                        studentCourse,
                                        id
                                    },
                                    index
                                ) => {
                                    const studentCourses = studentCourse;

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <Link to={`/student/${id}`}>
                                                    {studentName}
                                                </Link>
                                            </td>
                                            <td>{studentAge}</td>
                                            <td>{studentClass}</td>
                                            <td>
                                                <select defaultValue="">
                                                    <option disabled value="">
                                                        Courses
                                                    </option>
                                                    {studentCourses.map((course, index) => (
                                                        <option key={index} value={course}>
                                                            {course}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                ) : (
                    <div style={{ paddingLeft: "10px" }}>
                        <h4>Please complete the following to manage students</h4>
                        <ul>
                            {createdStatus && (
                                <li>
                                    <Link to="/create-course"> Create a course</Link>
                                </li>
                            )}
                            {createdStatus && (
                                <li>
                                    <Link to="/create-class">Create a Class</Link>
                                </li>
                            )}
                            {createdStatus && (
                                <li>
                                    <Link to="/create-student">Add a Student</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Students;
