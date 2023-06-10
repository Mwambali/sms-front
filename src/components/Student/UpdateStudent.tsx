import React, { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { useParams } from "react-router-dom";
import {
    selectStudents,
    selectUpdatedStatus,
    updateStudent,
} from "../../store/reducers/studentReducer";
import { selectCourses } from "../../store/reducers/courseReducer"
import { AppDispatch, RootState } from "../../store";
import { Student } from "../../store/actions/types";

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const UpdateStudent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const courses = useSelector(selectCourses);
    const students = useSelector(selectStudents);
    const updated = useSelector(selectUpdatedStatus);
    console.log(updated);

    const error = useSelector((state: RootState) => state.error);
    const courseList = courses.map((c) => c.courseName.toUpperCase());

    let { id: s_id } = useParams();
    const studentDetail = students.filter(({ id }) => id == s_id)[0];

    const [studentName, setStudentName] = useState("");
    const [studentAge, setStudentAge] = useState(0);
    const [studentClass, setStudentClass] = useState("");

    useEffect(() => {
        var input1 = document.querySelector("input[name=tags]") as HTMLTextAreaElement;;
        new Tagify(input1, {
            whitelist: [...courseList],
            dropdown: {
                classname: "color-blue",
                enabled: 0,
                maxItems: 5,
                position: "text",
                closeOnSelect: false,
                highlightFirst: true,
            },
        });

        if (studentDetail) {
            setStudentName(studentDetail.studentName.toUpperCase());
            setStudentAge(studentDetail.studentAge);
            setStudentClass(studentDetail.studentClass.toUpperCase());
        }
    }, [studentDetail]);

    useEffect(() => {
        if (updated) {
            console.log(updated);

            window.location.href = "/students";
        }
    }, [updated]);

    /* Classes */
    const classes = useSelector((state: RootState) => state.class.classes);
    const classOptions = classes.map((c) => c.className.toUpperCase());

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStudentClass(e.target.value);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let courseStudents: string[] = [];
        const tags = document.querySelectorAll(".tagify__tag");
        for (var i = 0; i < tags.length; i++) {
            if (tags[i]) {
                courseStudents.push(tags[i].getAttribute("value") || "");
            }
        }

        const updatedStudent: Student = {
            studentName,
            studentAge,
            studentClass,
            studentCourse: courseStudents,
            slug: studentDetail?.slug || ""
        };

        dispatch(updateStudent(updatedStudent));
    };

    return (
        <div className="container">
            <AppNavbar />
            <div className="class__wrapper">
                {studentDetail ? (
                    <>
                        <div className="class__wrapper__left">
                            <img src={avatar} alt="Avatar" />

                            <ul>
                                <li> Create a student</li>
                                <li>Update Student Name</li>
                                <li> Update Student Class</li>
                                <li>Update Student Age</li>
                                <li>Update Student Course(s)</li>
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
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                    />

                                    <label htmlFor="studentage">Student Age</label>
                                    <input
                                        type="number"
                                        name="studentage"
                                        id="studentage"
                                        placeholder="Student Age"
                                        className="mb-3"
                                        value={studentAge}
                                        onChange={(e) => setStudentAge(parseInt(e.target.value))}
                                    />

                                    <label htmlFor="assigncourses">Assign Courses to this Student</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        id="assigncourses"
                                        placeholder="Assign Courses"
                                        className="mb-3"
                                        value={studentDetail?.studentCourse
                                            .map((course) => course.toUpperCase())
                                            .join(", ")}
                                    />

                                    <div className="student__wrapper">
                                        <label htmlFor="name">Select Class of Student</label>
                                        <br />
                                        <select value={studentClass} onChange={onChange}>
                                            {classOptions.map((o, index) => (
                                                <option key={index} value={o}>
                                                    {o}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {error.id === "UPDATE_ERROR" && (
                                        <div
                                            className="err-msgs"
                                            style={{ color: "red", marginTop: "10px" }}
                                        >
                                            {error.msg}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        color="dark"
                                        style={{ marginTop: "1rem" }}
                                    >
                                        Update Student Records
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default UpdateStudent;




// import React, { /*useEffect, useState*/ } from "react";
// import AppNavbar from "../AppNavbar";
// // import Tagify from "@yaireo/tagify";
// // import { useSelector, useDispatch } from "react-redux";
// import { AvatarGenerator } from "random-avatar-generator";
// // import { useParams } from "react-router-dom";
// //import { RootState } from "../../store";
// //import { updateStudent } from "../../store/actions/studentActions";

// /* Avatar */
// const generator = new AvatarGenerator();
// const avatar = generator.generateRandomAvatar();

// const UpdateStudent: React.FC = () => {
//     // const dispatch = useDispatch();
//     // const { courses } = useSelector((state: RootState) => state.cou);
//     // const { students, updated } = useSelector((state: RootState) => state.stu);
//     // const courseList = courses.map((c) => c.course_name.toUpperCase());

//     // let { slug: s_slug } = useParams<{ slug: string }>();
//     // const studentDetail = students.filter(({ slug }) => slug === s_slug)[0];

//     // const { msg: errMsg, id: errID } = useSelector((state: RootState) => state.error);
//     // const [studentName, setStudentName] = useState("");
//     // const [studentAge, setStudentAge] = useState("");
//     // const [studentClass, setStudentClass] = useState("");

//     // useEffect(() => {
//     //     var input1 = document.querySelector<HTMLInputElement>("input[name=tags]");
//     //     new Tagify(input1, {
//     //         whitelist: [...courseList],
//     //         dropdown: {
//     //             classname: "color-blue",
//     //             enabled: 0,
//     //             maxItems: 5,
//     //             position: "text",
//     //             closeOnSelect: false,
//     //             highlightFirst: true,
//     //         },
//     //     });

//     //     if (studentDetail) {
//     //         setStudentName(studentDetail.student_name.toUpperCase());
//     //         setStudentAge(studentDetail.student_age);
//     //         setStudentClass(studentDetail.student_class.toUpperCase());
//     //     }
//     // }, [studentDetail]);

//     // useEffect(() => {
//     //     if (updated) {
//     //         window.location.href = "/students";
//     //     }
//     // }, [updated]);

//     // /* Classes */
//     // const { classes } = useSelector((state: RootState) => state.cla);
//     // const classOptions = classes.map((c) => c.class_name.toUpperCase());

//     // const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     //     setStudentClass(e.target.value);
//     // };

//     // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     //     e.preventDefault();

//     //     let courseStudents: string[] = [];
//     //     const tags = document.querySelectorAll<HTMLDivElement>(".tagify__tag");
//     //     for (let i = 0; i < tags.length; i++) {
//     //         const value = tags[i].getAttribute("value");
//     //         if (value) {
//     //             courseStudents.push(value);
//     //         }
//     //     }

//     //     dispatch(
//     //         updateStudent({
//     //             name: studentName,
//     //             age: studentAge,
//     //             className: studentClass,
//     //             courses: courseStudents,
//     //             slug: studentDetail.slug,
//     //             uid: studentDetail.uid,
//     //         })
//     //     );
//     // };

//     return (
//         <div className="container">
//             <AppNavbar />
//             <div className="class__wrapper">
//                 {/* {studentDetail ? ( */}
//                 <>
//                     <div className="class__wrapper__left">
//                         <img src={avatar} alt="Avatar" />

//                         <ul>
//                             <li> Create a student</li>
//                             <li>Update Student Name</li>
//                             <li> Update Student Class</li>
//                             <li>Update Student Age</li>
//                             <li>Update Student Course(s)</li>
//                         </ul>
//                     </div>
//                     <div className="class__wrapper__right">
//                         {/* <form ={onSubmit} method="post"> */}
//                         <form>
//                             <div className="form-group">
//                                 <label htmlFor="name">Student Name</label>
//                                 <input
//                                     type="text"
//                                     name="studentname"
//                                     id="studentname"
//                                     placeholder="Student Name"
//                                     className="mb-3"
//                                 // value={studentName}
//                                 // onChange={(e) => setStudentName(e.target.value)}
//                                 />
//                                 <label htmlFor="age">Student Age</label>
//                                 <input
//                                     type="number"
//                                     name="studentage"
//                                     id="studentage"
//                                     placeholder="Student Age"
//                                     className="mb-3"
//                                 // onChange={(e) => setStudentAge(e.target.value)}
//                                 // value={studentAge}
//                                 />

//                                 <label htmlFor="name">Assign Courses to this Student</label>
//                                 <input
//                                     type="text"
//                                     name="tags"
//                                     id="assigncourses"
//                                     placeholder="Assign Courses"
//                                     className="mb-3"
//                                 // value={`${studentDetail.student_course.toUpperCase()}`}
//                                 />

//                                 <div className="student__wrapper">
//                                     <label htmlFor="name">Select Class of Student</label>
//                                     <br />
//                                     {/* <select value={studentClass} onChange={onChange}>
//                                         {classOptions.map((o) => (
//                                             <option key={o} value={o}>
//                                                 {o}
//                                             </option>
//                                         ))}
//                                     </select> */}
//                                 </div>

//                                 {/* {errID === "UPDATE_ERROR" ? (
//                                     <div
//                                         className="err-msgs"
//                                         style={{ color: "red", marginTop: "10px" }}
//                                     >
//                                         {errMsg}
//                                     </div>
//                                 ) : null} */}

//                                 <button type="submit" color="dark" style={{ marginTop: "1rem" }}>
//                                     Update Student Records
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </>
//                 {/* ) : null} */}
//             </div>
//         </div >
//     );
// };

// export default UpdateStudent;
