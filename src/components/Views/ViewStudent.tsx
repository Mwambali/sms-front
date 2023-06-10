import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { deleteStudent, selectDeletedStatus } from "../../store/reducers/studentReducer";
import { AvatarGenerator } from "random-avatar-generator";
import AppNavbar from "../AppNavbar";

const generator = new AvatarGenerator();

const ViewStudent: React.FC = () => {
    const { id: s_id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const deleted = useSelector(selectDeletedStatus);

    const students = useSelector((state: RootState) => state.student.students);
    const studentDetail = students.find(({ id }) => id == s_id);
    const totalCourse = studentDetail?.studentCourse.length || 0;

    const onDelete = (id: string | undefined) => {
        if (id) {
            dispatch(deleteStudent(id));
        }
    };

    useEffect(() => {
        if (deleted) {
            window.location.href = "/students";
        }
    }, [deleted]);

    return (
        <div className="container">
            <AppNavbar />
            <div className="one__student">
                {studentDetail ? (
                    <>
                        <div className="one__student__left">
                            <img src={generator.generateRandomAvatar()} alt="Avatar" />
                            <h1>{studentDetail.studentName.toUpperCase()}</h1>
                        </div>
                        <div className="one__student__right">
                            <ul>
                                <li>
                                    <span>Name</span>: {studentDetail.studentName.toUpperCase()}
                                </li>
                                <li>
                                    <span>Age</span>: {studentDetail.studentAge}
                                </li>
                                <li>
                                    <span>Class</span>: {studentDetail.studentClass.toUpperCase()}
                                </li>
                                <li>
                                    <span>Courses</span>: {studentDetail.studentCourse}
                                </li>
                                <li>
                                    <span>Total Number Courses</span>: {totalCourse}
                                </li>
                            </ul>
                            <div className="one__actions">
                                <Link to={`/student/update/${studentDetail.id}`}>
                                    Update student records
                                </Link>
                                <button className="del-btn" onClick={() => onDelete(studentDetail?.id)}>
                                    Delete student records
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <h3>Record Unavailable for Student</h3>
                )}
            </div>
        </div>
    );
}

export default ViewStudent;




// import React, { /*useEffect*/ } from "react";
// import AppNavbar from "../AppNavbar";
// import { AvatarGenerator } from "random-avatar-generator";
// import { Link, /*useParams*/ } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { RootState } from "../../store";
// // import { deleteStudent } from "../../store/actions/studentActions";

// const generator = new AvatarGenerator();
// const avatar = generator.generateRandomAvatar();

// const ViewStudent: React.FC = () => {
//     // const { slug: s_slug } = useParams<{ slug: string }>();
//     // const dispatch = useDispatch();

//     // const { students, deleted } = useSelector((state: RootState) => state.stu);
//     // const studentDetail = students.find(({ slug }) => slug === s_slug);
//     // const totalCourse = studentDetail?.student_course.split(" ").length || 0;

//     // const onDelete = (uid: string) => dispatch(deleteStudent(uid));

//     // useEffect(() => {
//     //     if (deleted) {
//     //         window.location.href = "/students";
//     //     }
//     // }, [deleted]);

//     return (
//         <div className="container">
//             <AppNavbar />
//             <div className="one__student">
//                 {/* {studentDetail ? ( */}
//                 <>
//                     <div className="one__student__left">
//                         <img src={avatar} alt="Avatar" />
//                         <h1>
//                             {/* {studentDetail.student_name.toUpperCase()} */}
//                             Dynamic Student Name
//                         </h1>
//                     </div>
//                     <div className="one__student__right">
//                         <ul>
//                             <li>
//                                 <span>Name</span>:
//                                 {/* {studentDetail.student_name.toUpperCase()} */}
//                             </li>
//                             <li>
//                                 <span>Age</span>:
//                                 {/* {studentDetail.student_age} */}
//                             </li>
//                             <li>
//                                 <span>Class</span>:
//                                 {/* {studentDetail.student_class.toUpperCase()} */}
//                             </li>
//                             <li>
//                                 <span>Courses</span>:
//                                 {/* {studentDetail.student_course.toUpperCase()} */}
//                             </li>
//                             <li>
//                                 <span>Total Number Courses</span>:
//                                 {/* {totalCourse} */}
//                             </li>
//                         </ul>

//                         <div className="one__actions">
//                             <Link to={'/'} /*to={`/student/update/${studentDetail.slug}`}*/>
//                                 Update student records
//                             </Link>

//                             <button
//                                 className="del-btn"
//                             // onClick={() => onDelete(studentDetail.uid)}
//                             >
//                                 Delete student records
//                             </button>
//                         </div>
//                     </div>
//                 </>
//                 {/* ) : (
//                     <h3>Record Unavailable for Student</h3>
//                 )} */}
//             </div>
//         </div>
//     );
// };

// export default ViewStudent;