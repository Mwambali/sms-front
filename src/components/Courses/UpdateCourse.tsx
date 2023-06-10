import React, { useEffect, useRef, useState } from "react";
import AppNavbar from "../AppNavbar";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { useParams } from "react-router-dom";

/* Actions */
import { updateACourse } from "../../store/reducers/courseReducer";
import { RootState, AppDispatch } from "../../store";

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const UpdateStudent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id: s_id } = useParams();
    const { courses, updated } = useSelector((state: RootState) => state.course);
    const { students } = useSelector((state: RootState) => state.student);
    const error = useSelector((state: RootState) => state.error);
    const tagifyRef = useRef<Tagify | null>(null);

    const courseDetail = courses.find(({ id }) => id == s_id);

    const [courseName, setCourseName] = useState("");
    const [credits, setCredits] = useState(0);

    useEffect(() => {
        const input1 = document.querySelector("input[name=tags]") as HTMLTextAreaElement;;

        if (courseDetail) {
            var studentList = students
                .map(({ studentCourse, studentName }) => {
                    if (studentCourse.includes(courseDetail.courseName.toLowerCase())) {
                        return studentName.toUpperCase();
                    }
                    return null;
                })
                .filter((std) => std != undefined) as string[];

            if (students.length > 0)
                tagifyRef.current = new Tagify(input1, {
                    whitelist: [...studentList],
                    dropdown: {
                        classname: "color-blue",
                        enabled: 0,
                        maxItems: 5,
                        position: "text",
                        closeOnSelect: false,
                        highlightFirst: true,
                    },
                });
        }

        if (courseDetail) {
            setCourseName(courseDetail.courseName.toUpperCase());
            setCredits(courseDetail.credits);
        }
    }, [courseDetail, students]);

    useEffect(() => {
        if (updated) {
            window.location.href = "/courses";
        }
    }, [updated]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "coursename") {
            setCourseName(e.target.value);
        } else if (e.target.name === "credits") {
            setCredits(parseInt(e.target.value));
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let courseStudents: string[] = [];
        const tags = document.querySelectorAll(".tagify__tag");
        for (var i = 0; i < tags.length; i++) {
            if (tags[i]) {
                courseStudents.push(tags[i].getAttribute("value")!);
            }
        }

        dispatch(
            updateACourse({
                courseName,
                students: courseStudents,
                id: courseDetail?.id,
                credits,
            })
        );
    };

    return (
        <div className="container">
            <AppNavbar />
            <div className="class__wrapper">
                {courseDetail ? (
                    <>
                        <div className="class__wrapper__left">
                            <img src={avatar} alt="Avatar" />

                            <ul>
                                <li> Update a course</li>
                                <li>Update Course name</li>
                                <li> Add Student to course</li>
                            </ul>
                        </div>
                        <div className="class__wrapper__right">
                            <form onSubmit={onSubmit} method="post">
                                <div className="form-group">
                                    <label htmlFor="name">Course Name</label>
                                    <input
                                        type="text"
                                        name="coursename"
                                        id="coursename"
                                        placeholder="Course Name"
                                        className="mb-3"
                                        value={courseName}
                                        onChange={onChange}
                                    />

                                    <label htmlFor="credits">Credits</label>
                                    <input
                                        type="number"
                                        name="credits"
                                        id="credits"
                                        placeholder="Credits"
                                        className="mb-3"
                                        value={credits}
                                        onChange={onChange}
                                    />

                                    <label htmlFor="coursename">
                                        Assign Courses to this Student
                                    </label>
                                    <input
                                        type="text"
                                        name="tags"
                                        id="assigncourses"
                                        placeholder="Assign Courses"
                                        className="mb-3"
                                        value={`${courseDetail.students}`}
                                    />

                                    {error.id === "UPDATE_COURSE_ERROR" ? (
                                        <div
                                            className="err-msgs"
                                            style={{ color: "red", marginTop: "10px" }}
                                        >
                                            {error.msg}
                                        </div>
                                    ) : null}

                                    <button color="dark" style={{ marginTop: "1rem" }}>
                                        Update Course Records
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





// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { updateACourse } from "../../store/reducers/courseReducer";
// import { AppDispatch, RootState } from "../../store";
// import { AvatarGenerator } from "random-avatar-generator";

// // /* Avatar */
// const generator = new AvatarGenerator();
// const avatar = generator.generateRandomAvatar();

// const UpdateCourse: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     let { slug: s_slug } = useParams();
//     const { courses, updated } = useSelector((state: RootState) => state.course);

//     const courseDetail = courses.find((course) => course.slug === s_slug);

//     const { msg: errMsg, id: errID } = useSelector((state: RootState) => state.error);
//     const [courseName, setCourseName] = useState("");
//     const [credits, setCredits] = useState(0);

//     useEffect(() => {
//         if (courseDetail) {
//             setCourseName(courseDetail.courseName.toUpperCase());
//             setCredits(courseDetail.credits);
//         }
//     }, [courseDetail]);

//     useEffect(() => {
//         if (updated) {
//             window.location.href = "/courses";
//         }
//     }, [updated]);

//     const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.name === "coursename") {
//             setCourseName(e.target.value);
//         } else if (e.target.name === "credits") {
//             setCredits(parseInt(e.target.value));
//         }
//     };
//     const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         let courseStudents = [];
//         const tags = document.querySelectorAll(".tagify__tag");
//         for (var i = 0; i < tags.length; i++) {
//             courseStudents.push(tags[i].getAttribute("value"));
//         }

//         if (courseDetail) dispatch(
//             updateACourse({
//                 courseName: courseName,
//                 courseStudents: courseStudents.filter((course) => course !== null) as string[],
//                 credits,
//                 id: courseDetail.id,
//                 slug: s_slug,
//             })
//         );
//     };

//     return (
//         <div className="container">
//             <div className="class__wrapper">
//                 {courseDetail ? (
//                     <>
//                         <div className="class__wrapper__left">
//                             <img src={avatar} alt="Avatar" />

//                             <ul>
//                                 <li>Update a course</li>
//                                 <li>Update Course name</li>
//                                 <li>Add Student to course</li>
//                             </ul>
//                         </div>
//                         <div className="class__wrapper__right">
//                             <form onSubmit={onSubmit} method="post">
//                                 <div className="form-group">
//                                     <label htmlFor="name">Course Name</label>
//                                     <input
//                                         type="text"
//                                         name="coursename"
//                                         id="coursename"
//                                         placeholder="Course Name"
//                                         className="mb-3"
//                                         value={courseName}
//                                         onChange={onChange}
//                                     />

//                                     <label htmlFor="credits">Credits</label>
//                                     <input
//                                         type="number"
//                                         name="credits"
//                                         id="credits"
//                                         placeholder="Credits"
//                                         className="mb-3"
//                                         value={credits}
//                                         onChange={onChange}
//                                     />

//                                     <label htmlFor="coursename">
//                                         Assign Courses to this Student
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="tags"
//                                         id="assigncourses"
//                                         placeholder="Assign Courses"
//                                         className="mb-3"
//                                         value={courseDetail.courseStudents}
//                                         disabled
//                                     />

//                                     {errID === "UPDATE_COURSE_ERROR" && (
//                                         <div
//                                             className="err-msgs"
//                                             style={{ color: "red", marginTop: "10px" }}
//                                         >
//                                             {errMsg}
//                                         </div>
//                                     )}

//                                     <button
//                                         type="submit"
//                                         color="dark"
//                                         style={{ marginTop: "1rem" }}
//                                     >
//                                         Update Course Records
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </>
//                 ) : null}
//             </div>
//         </div>
//     );
// };

// export default UpdateCourse;






// import React, { useEffect, useState } from "react";
// import AppNavbar from "../AppNavbar";
// import Tagify from "@yaireo/tagify";
// import { useSelector, useDispatch } from "react-redux";
// import { AvatarGenerator } from "random-avatar-generator";
// import { useParams } from "react-router-dom";

// /* Actions */
// import { updateACourse } from "../../store/actions/classActions";

// /* Avatar */
// const generator = new AvatarGenerator();
// const avatar = generator.generateRandomAvatar();

// const UpdateStudent = () => {
//     const dispatch = useDispatch();
//     let { slug: s_slug } = useParams();
//     const { courses, updated } = useSelector((state) => state.cou);
//     const { students } = useSelector((state) => state.stu);

//     const courseDetail = courses.filter(({ slug }) => slug === s_slug)[0];

//     const { msg: errMsg, id: errID } = useSelector((state) => state.error);
//     const [courseName, setCourseName] = useState("");

//     useEffect(() => {
//         var input1 = document.querySelector("input[name=tags]");

//         if (courseDetail) {
//             const studentList = students
//                 .map(({ student_course, student_name }) => {
//                     if (student_course.includes(courseDetail.course_name.toLowerCase())) {
//                         return student_name.toUpperCase();
//                     }
//                     return null;
//                 })
//                 .filter((std) => std != undefined);

//             if (students.length > 0)
//                 new Tagify(input1, {
//                     whitelist: [...studentList],
//                     dropdown: {
//                         classname: "color-blue",
//                         enabled: 0,
//                         maxItems: 5,
//                         position: "text",
//                         closeOnSelect: false,
//                         highlightFirst: true,
//                     },
//                 });
//         }

//         if (courseDetail) {
//             setCourseName(courseDetail.course_name.toUpperCase());
//         }
//     }, [courseDetail]);

//     useEffect(() => {
//         if (updated) {
//             window.location.href = "/courses";
//         }
//     }, [updated]);

//     const onChange = (e) => setCourseName(e.target.value);

//     const onSubmit = (e) => {
//         e.preventDefault();

//         let courseStudents = [];
//         const tags = document.querySelectorAll(".tagify__tag");
//         for (var i = 0; i <= tags.length; i++) {
//             if (tags[i]) {
//                 courseStudents.push(tags[i].getAttribute("value"));
//             }
//         }

//         dispatch(
//             updateACourse({
//                 course_name: courseName,
//                 students: courseStudents,
//                 uid: courseDetail.uid,
//                 slug: s_slug,
//             })
//         );
//     };

//     return (
//         <div className="container">
//             <AppNavbar />
//             <div className="class__wrapper">
//                 {courseDetail ? (
//                     <>
//                         <div className="class__wrapper__left">
//                             <img src={avatar} />

//                             <ul>
//                                 <li> Update a course</li>
//                                 <li>Update Course name</li>
//                                 <li> Add Student to course</li>
//                             </ul>
//                         </div>
//                         <div className="class__wrapper__right">
//                             <form {...{ onSubmit }} method="post">
//                                 <div className="form-group">
//                                     <label htmlFor="name">Course Name</label>
//                                     <input
//                                         type="text"
//                                         name="coursename"
//                                         id="coursename"
//                                         placeholder="Course Name"
//                                         className="mb-3"
//                                         value={courseName}
//                                         {...{ onChange }}
//                                     />

//                                     <label htmlFor="coursename">
//                                         Assign Courses to this Student
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="tags"
//                                         id="assigncourses"
//                                         placeholder="Assign Courses"
//                                         className="mb-3"
//                                         value={`${courseDetail.course_students.toUpperCase()}`}
//                                     />

//                                     {errID == "UPDATE_COURSE_ERROR" ? (
//                                         <div
//                                             className="err-msgs"
//                                             style={{ color: "red", marginTop: "10px" }}
//                                         >
//                                             {errMsg}
//                                         </div>
//                                     ) : null}

//                                     <button color="dark" style={{ marginTop: "1rem" }} block>
//                                         Update Course Records
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </>
//                 ) : null}
//             </div>
//         </div>
//     );
// };

// export default UpdateStudent;