import React, { useState, useEffect, useRef } from "react";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';

/* Actions */
import { createCourse } from "../../store/reducers/courseReducer";
import { AppDispatch, RootState } from "../../store";
import { selectCreatedStatus } from "../../store/reducers/courseReducer";
import { clearErrors } from "../../store/reducers/errorReducer";
import { selectStudents } from "../../store/reducers/studentReducer";
// import { Course } from "../../store/actions/types";


const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const AdminCourse: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [courseName, setCourseName] = useState("");
    const [courseCredits, setCourseCredits] = useState(0);
    const [selectedStudents, setSelectedStudents] = useState<any[]>([]);

    // const [courseStudents, setCourseStudents] = useState<string[]>([]);
    // const [availableStudents, setAvailableStudents] = useState<string[]>([]);

    const selectRef = useRef<any>(null);


    const { msg: errMsg, id: errID } = useSelector(
        (state: RootState) => state.error
    );

    const students = useSelector(selectStudents);
    const options = students.map((student) => ({
        value: student.id,
        label: student.studentName,
    }));


    const created = useSelector(selectCreatedStatus);

    useEffect(() => {
        if (created) {
            window.location.href = "/courses";
        }
    }, [created]);

    // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     dispatch(
    //         createCourse({
    //             courseName,
    //             students: courseStudents,
    //             credits: courseCredits
    //         })
    //     );
    //     dispatch(clearErrors());
    // };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const studentIds = selectedStudents.map((student) => student.label);

        dispatch(
            createCourse({
                courseName,
                students: studentIds,
                credits: courseCredits,
            })
        );
        dispatch(clearErrors());
    };


    // const handleAddStudent = (studentName: string) => {
    //     setCourseStudents((prevStudents) => [...prevStudents, studentName]);
    // };
    const handleSelectStudent = (selectedOption: any) => {
        setSelectedStudents((prevStudents) => [...prevStudents, selectedOption]);
        // Clear the selected option after adding
        selectRef.current.select.clearValue();
    };

    const handleRemoveStudent = (selectedOption: any) => {
        setSelectedStudents((prevStudents) =>
            prevStudents.filter((student) => student.value !== selectedOption.value)
        );
    };



    return (
        <div className="container">
            <AppNavbar />
            <div className="class__wrapper">
                <div className="class__wrapper__left">
                    <img src={avatar} alt="Avatar" />

                    <h1>Course Creation</h1>
                    <ul>
                        <li>Create A Course(eg: English)</li>
                        <li>Add students to course</li>
                    </ul>
                </div>
                <div className="class__wrapper__right">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="coursename">Course Name</label>
                            <input
                                type="text"
                                name="coursename"
                                id="coursename"
                                placeholder="Course Name"
                                className="mb-3"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="credits">Credits</label>
                            <input
                                type="number"
                                name="credits"
                                id="credits"
                                placeholder="Number of Credits"
                                className="mb-3"
                                value={courseCredits}
                                onChange={(e) => setCourseCredits(Number(e.target.value))}
                            />
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="students">Students</label>
                            <input
                                type="text"
                                name="students"
                                id="students"
                                placeholder="Add students"
                                className="mb-3"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        const studentName = e.currentTarget.value;
                                        if (studentName) {
                                            handleAddStudent(studentName);
                                            e.currentTarget.value = "";
                                        }
                                    }
                                }}
                            />
                            <div className="tagify">
                                {courseStudents.map((student, index) => (
                                    <div key={index} className="tagify__tag">
                                        {student}
                                    </div>
                                ))}
                            </div>
                        </div> */}

                        <div className="form-group">
                            <label htmlFor="students">Students</label>
                            <Select
                                options={options}
                                ref={selectRef}
                                onChange={handleSelectStudent}
                                className="mb-3"
                                placeholder="Select students"
                            />
                            <div className="selected-students">
                                {selectedStudents.map((student) => (
                                    <div key={student.value} className="selected-student">
                                        {student.label}
                                        <button
                                            className="remove-student"
                                            onClick={() => handleRemoveStudent(student)}
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>



                        {errID === "COURSE__ERROR" ? (
                            <div
                                className="err-msgs"
                                style={{ color: "red", marginTop: "10px" }}
                            >
                                {errMsg}
                            </div>
                        ) : null}

                        <button type="submit" color="dark" style={{ marginTop: "1rem" }}>
                            Create Course
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminCourse;