import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, selectCourses, selectDeletedStatus } from "../../store/reducers/courseReducer";
import { selectStudents } from "../../store/reducers/studentReducer";
import { AppDispatch } from "../../store";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();

const ViewCourse: React.FC = () => {
    let { id: s_id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const courses = useSelector(selectCourses);

    const deleted = useSelector(selectDeletedStatus);
    const students = useSelector(selectStudents);


    const courseDetail = courses.find(({ id }) => id == s_id);

    const [courseStudents, setCourseStudents] = useState<string[]>([]);
    // const [isLoading, setIsLoading] = useState(true);

    const onDelete = (id: string | undefined) => {
        if (id) {
            dispatch(deleteCourse(id));
        }
    };

    useEffect(() => {
        if (courseDetail) {
            const studentList = students
                .filter(({ studentCourse }) => studentCourse.includes(courseDetail.courseName))
                .map(({ studentName }) => studentName.toUpperCase());
            console.log(studentList);

            setCourseStudents(studentList);
            // setIsLoading(false);

        }
    }, [courseDetail, students, s_id]);

    // useEffect(() => {
    //     if (courseDetail) {
    //         const studentList = students
    //             .map(({ studentCourse, studentName }) => {
    //                 if (studentCourse.includes(courseDetail.courseName)) {
    //                     return studentName.toUpperCase();
    //                 }
    //             })
    //             .filter((student) => student != undefined);

    //         setCourseStudents(studentList);
    //     }
    // }, [courseDetail, students]);

    useEffect(() => {
        if (deleted) {
            window.location.href = "/courses";
        }
    }, [deleted]);

    // if (isLoading) {
    //     return <div>Loading...</div>; // Display a loading spinner or message while fetching course details
    // }

    return (
        <div className="container">
            <AppNavbar />
            <div className="one__student">
                {courseDetail ? (
                    <>
                        <div className="one__student__left">
                            <img src={generator.generateRandomAvatar()} alt="Avatar" />
                            <h1>{courseDetail.courseName.toUpperCase()}</h1>
                        </div>
                        <div className="one__student__right">
                            <ul>
                                <li>
                                    <span>Name</span>: {courseDetail.courseName.toUpperCase()}
                                </li>
                                <li>
                                    <h3>Course Students</h3>

                                    {courseStudents.length > 0 ? (
                                        <ol>
                                            {courseStudents.map((c, index) => (
                                                <li key={index}>{c}</li>
                                            ))}
                                        </ol>
                                    ) : (
                                        <div>
                                            <h6>No Students Assigned Yet</h6>
                                        </div>
                                    )}
                                </li>
                            </ul>

                            <div className="one__actions">
                                <Link to={`/course/update/${courseDetail.id}`}>Update Course</Link>

                                <button
                                    className="del-btn"
                                    onClick={() => onDelete(courseDetail.id)}
                                >
                                    Delete Course
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <h3>Record Unavailable for Course</h3>
                )}
            </div>
        </div>
    );
}

export default ViewCourse;
