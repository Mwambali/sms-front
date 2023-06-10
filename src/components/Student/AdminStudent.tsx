import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";

import { AppDispatch, RootState } from "../../store";
import { createStudent } from "../../store/reducers/studentReducer";

import AppNavbar from "../AppNavbar";

const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const AdminStudent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const courses = useSelector((state: RootState) => state.course.courses);
    const created = useSelector((state: RootState) => state.student.created);
    const classes = useSelector((state: RootState) => state.class.classes);
    const error = useSelector((state: RootState) => state.error);

    const courseList = courses.map((c) => c.courseName.toUpperCase());

    useEffect(() => {
        if (created) {
            window.location.href = "/students";
        }
    }, [created]);

    const [studentName, setStudentName] = useState("");
    const [studentAge, setStudentAge] = useState(0);
    const [studentClass, setStudentClass] = useState("");
    const [selectedCourses, setSelectedCourses] = useState<string>(""); // was <string[]>([])


    const classOptions = classes.map((c) => c.className.toUpperCase());

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStudentClass(e.target.value);
    };

    // const onCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedCourses(Array.from(e.target.selectedOptions, (option) => option.value));
    // };

    const onCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCourses(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(
            createStudent({
                studentName,
                studentAge,
                studentClass,
                studentCourse: [selectedCourses],
                // studentCourse: courseStudents.filter((course) => course !== null) as string[]
            })
        );
    };

    return (
        <div className="container">
            <AppNavbar />
            <div className="class__wrapper">
                <div className="class__wrapper__left">
                    <img src={avatar} alt="Avatar" />

                    <ul>
                        <li> Create a student</li>
                        <li>Add Student Name</li>
                        <li> Add Student to Class</li>
                        <li>Add Student Age</li>
                        <li>Add Studen Courses</li>
                    </ul>
                </div>
                <div className="class__wrapper__right">
                    <form onSubmit={onSubmit} method="post">
                        <div className="form-group">
                            <label htmlFor="studentname">Student Name</label>
                            <input
                                type="text"
                                name="studentname"
                                id="studentname"
                                placeholder="Student Name"
                                className="mb-3"
                                onChange={(e) => setStudentName(e.target.value)}
                            />

                            <label htmlFor="studentage">Student Age</label>
                            <input
                                type="number"
                                name="studentage"
                                id="studentage"
                                placeholder="Student Age"
                                onChange={(e) => setStudentAge(parseInt(e.target.value))}
                            />

                            {/* <label htmlFor="studentCourse">Assign Courses to this Student</label>
                            <select
                                multiple
                                name="studentCourse"
                                id="studentCourse"
                                value={selectedCourses}
                                onChange={onCourseChange}
                            >
                                {courseList.map((course, index) => (
                                    <option key={index} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </select> */}

                            <label htmlFor="studentCourse">Assign Course to this Student</label>
                            <select
                                id="studentCourse"
                                value={selectedCourses}
                                onChange={onCourseChange}
                            >
                                <option value="">Select a course</option>
                                {courseList.map((course, index) => (
                                    <option key={index} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </select>

                            <div className="student__wrapper">
                                <label htmlFor="studentclass">Select Class of Student</label>
                                <br />
                                <select id="studentclass" value={studentClass} onChange={onChange}>
                                    <option value="Select a class">Select class</option>
                                    {classOptions.map((o, index) => (
                                        <option key={index} value={o}>
                                            {o}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {error.id === "STUDENT__ERROR" ? (
                                <div
                                    className="err-msgs"
                                    style={{ color: "red", marginTop: "10px" }}
                                >
                                    {error.msg}
                                </div>
                            ) : null}

                            <button color="dark" style={{ marginTop: "1rem" }}>
                                Add Student
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminStudent;