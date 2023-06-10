import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteClass, selectClasses, selectDeletedStatus } from "../../store/reducers/classReducer";
import { selectStudents } from "../../store/reducers/studentReducer";
import { AppDispatch } from "../../store";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();

const ViewClass: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id: s_id } = useParams<{ id: string }>();

  const students = useSelector(selectStudents);
  const classes = useSelector(selectClasses);
  const deleted = useSelector(selectDeletedStatus);

  const classDetail = classes.find(({ id }) => id == s_id);

  const numOfStudents = students.filter(
    ({ studentClass }) => studentClass === classDetail?.className
  );

  const onDelete = (id: string | undefined) => {
    if (id) {
      dispatch(deleteClass(id));
    }
  };

  useEffect(() => {
    if (deleted) {
      navigate("/classes");
    }
  }, [deleted, navigate]);

  return (
    <div className="container">
      <AppNavbar />
      <div className="one__student">
        {classDetail ? (
          <>
            <div className="one__student__left">
              <img src={generator.generateRandomAvatar()} alt="Avatar" />
              <h1>{classDetail.className.toUpperCase()}</h1>
            </div>
            <div className="one__student__right">
              <ul>
                <li>
                  <span>Name</span>: {classDetail.className.toUpperCase()}
                </li>
                <li>
                  <span>Number of Students </span>:
                  {numOfStudents.length > 0 ? (
                    numOfStudents.length
                  ) : (
                    <span style={{ color: "red", marginLeft: "10px" }}>
                      No student attached to this class
                    </span>
                  )}
                </li>
                <li>
                  <span>Participating Students</span>:
                  <ol style={{ marginTop: "14px" }}>
                    {numOfStudents.map(({ studentName }) => (
                      <li key={studentName}>
                        <span
                          style={{
                            color: "green",
                            marginLeft: "10px",
                            textTransform: "capitalize",
                            fontSize: "12px",
                          }}
                        >
                          {studentName.toUpperCase()}
                        </span>
                      </li>
                    ))}
                  </ol>
                </li>
              </ul>

              <div className="one__actions">
                <Link to={`/class/update/${classDetail.id}`}>Update student records</Link>

                <button className="del-btn" onClick={() => onDelete(classDetail.id)}>
                  Delete Class
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

export default ViewClass;




// import React, { useEffect } from "react";
// import AppNavbar from "../AppNavbar";
// import { AvatarGenerator } from "random-avatar-generator";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store";
// import { deleteClass } from "../../store/actions/classActions";

// const generator = new AvatarGenerator();
// const avatar = generator.generateRandomAvatar();

// const ViewClass: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   let { slug: s_slug } = useParams<{ slug: string }>();

//   const { students } = useSelector((state: RootState) => state.student);
//   const { classes, deleted } = useSelector((state: RootState) => state.class);
//   const classDetail = classes.find(({ slug }) => slug === s_slug);

//   const numOfStudents = students.filter(
//     ({ student_class }) => student_class === classDetail?.className
//   );

//   const onDelete = (uid: string) => dispatch(deleteClass(uid));

//   useEffect(() => {
//     if (deleted) {
//       navigate("/classes");
//     }
//   }, [deleted, navigate]);

//   return (
//     <div className="container">
//       <AppNavbar />
//       <div className="one__student">
//         {/* {classDetail ? ( */}
//         <>
//           <div className="one__student__left">
//             <img src={avatar} alt="Avatar" />
//             <h1>
//               {/* {classDetail.class_name.toUpperCase()} */}
//               Dynamic Class Name
//             </h1>
//           </div>
//           <div className="one__student__right">
//             <ul>
//               <li>
//                 <span>Name</span>:
//                 {/* {classDetail.class_name.toUpperCase()} */}
//               </li>
//               <li>
//                 <span>Number of Students </span>:
//                 {/* {numOfStudents.length > 0 ? (
//                     numOfStudents.length
//                   ) : (
//                     <span style={{ color: "red", marginLeft: "10px" }}>
//                       No student attached to this class
//                     </span>
//                   )} */}
//               </li>
//               <li>
//                 <span>Participating Students</span>:
//                 {/* <ol style={{ marginTop: "14px" }}>
//                     {numOfStudents.map(({ student_name }) => (
//                       <li key={student_name}>
//                         <span
//                           style={{
//                             color: "green",
//                             marginLeft: "10px",
//                             textTransform: "capitalize",
//                             fontSize: "12px",
//                           }}
//                         >
//                           {student_name.toUpperCase()}
//                         </span>
//                       </li>
//                     ))}
//                   </ol> */}
//               </li>
//             </ul>

//             <div className="one__actions">
//               <Link to={''} /*to={`/class/update/${classDetail.slug}`}*/>
//                 Update student records
//               </Link>

//               <button
//                 className="del-btn"
//               // onClick={() => onDelete(classDetail.uid)}
//               >
//                 Delete Class
//               </button>
//             </div>
//           </div>
//         </>
//         {/* ) : (
//           <h3>Record Unavailable for Student</h3>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default ViewClass;