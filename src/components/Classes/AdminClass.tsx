import React, { useState, useEffect } from 'react';
import { AvatarGenerator } from 'random-avatar-generator';
import { useDispatch, useSelector } from 'react-redux';
import { createClass, /*selectCreatedStatus*/ } from '../../store/reducers/classReducer';
// import { selectCreatedStatus } from '../../store/reducers/classReducer';
import { AppDispatch, RootState } from '../../store';
import AppNavbar from '../AppNavbar';
import { useNavigate } from 'react-router-dom';


const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

interface AdminClassProps { }

const AdminClass: React.FC<AdminClassProps> = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Local component state
    const [className, setClassName] = useState('');
    // const created = useSelector(selectCreatedStatus);
    const { created } = useSelector((state: RootState) => state.class);
    const { msg: errMsg, id: errID } = useSelector((state: RootState) => state.error);
    console.log(errMsg);


    useEffect(() => {
        if (created) {
            navigate('/classes');
        }
    }, [created, navigate]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(createClass(className));
    };

    return (
        <div className="container">
            <AppNavbar />
            <div className="class__wrapper">
                <div className="class__wrapper__left">
                    <img src={avatar} alt="Avatar" />
                    <h3>Classes</h3>
                    <ul>
                        <li>Create A Class(eg: Primary 1)</li>
                    </ul>
                </div>
                <div className="class__wrapper__right">
                    <h2>Create a class</h2>
                    <form {...{ onSubmit }} className="form">
                        <div className="form-group">
                            <label htmlFor="name">Class Name</label>
                            <input
                                type="text"
                                name="classname"
                                id="name"
                                placeholder="Class Name"
                                className="mb-3"
                                onChange={(e) => setClassName(e.target.value)}
                                value={className}
                            />
                            {errID === 'CLASS__ERROR' ? (
                                <div className="err-msgs" style={{ color: 'red', marginTop: '10px' }}>
                                    {errMsg}
                                </div>
                            ) : null}

                            <button type="submit" color="dark" style={{ marginTop: '1rem' }}>
                                Create Class
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminClass;




// import React, { useState, useEffect } from "react";
// import { AvatarGenerator } from "random-avatar-generator";
// import AppNavbar from "../AppNavbar";
// import { useDispatch, useSelector } from "react-redux";
// import { createClass } from "../../store/actions/classActions";
// import { useNavigate } from "react-router-dom";

// /* Avatar Generator*/
// const generator = new AvatarGenerator();
// const avatar = generator.generateRandomAvatar();

// const AdminClass: React.FC = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [className, setClassName] = useState("");
//     const { created } = useSelector((state: any) => state.cla);
//     const { msg: errMsg, id: errID } = useSelector((state: any) => state.error);

//     useEffect(() => {
//         if (created) {
//             navigate('/classes');
//         }
//     }, [created, navigate]);

//     const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         dispatch(createClass({ name: className }));
//     };

//     return (
//         <div className="container">
//             <AppNavbar />
//             <div className="class__wrapper">
//                 <div className="class__wrapper__left">
//                     <img src={avatar} alt="Avatar" />
//                     <h3>Classes</h3>
//                     <ul>
//                         <li>Create A Class(eg: Primary 1)</li>
//                     </ul>
//                 </div>
//                 <div className="class__wrapper__right">
//                     <h2>Create a class</h2>
//                     <form onSubmit={onSubmit} className="form">
//                         <div className="form-group">
//                             <label htmlFor="name">Class Name</label>
//                             <input
//                                 type="text"
//                                 name="classname"
//                                 id="classname"
//                                 placeholder="Class Name"
//                                 className="mb-3"
//                             onChange={(e) => setClassName(e.target.value)}
//                             value={className}
//                             />
//                             {errID === "CLASS__ERROR" ? (
//                                 <div
//                                     className="err-msgs"
//                                     style={{ color: "red", marginTop: "10px" }}
//                                 >
//                                     {errMsg}
//                                 </div>
//                             ) : null}

//                             <button type="submit" color="dark" style={{ marginTop: "1rem" }} >
//                                 Create Class
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminClass;