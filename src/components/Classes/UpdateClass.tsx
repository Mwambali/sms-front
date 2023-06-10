import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateAClass } from "../../store/reducers/classReducer";
import { AppDispatch, RootState } from "../../store";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";

// /* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

interface UpdateClassProps { }

const UpdateClass: React.FC<UpdateClassProps> = () => {
    let { id: s_id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { classes, updated } = useSelector((state: RootState) => state.class);

    const classDetail = classes.filter(({ id }) => id == s_id)[0];

    const { msg: errMsg, id: errID } = useSelector((state: RootState) => state.error);
    const [className, setClassName] = useState("");

    useEffect(() => {
        if (updated) {
            window.location.href = "/classes";
        }

        if (classDetail) {
            setClassName(classDetail.className.toUpperCase());
        }
    }, [classDetail, updated]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setClassName(e.target.value);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(
            updateAClass({
                className,
                slug: classDetail.slug,
                id: classDetail.id,
            })
        );
    };

    return (
        <div className="container">
            <AppNavbar />
            <div className="class__wrapper">
                {classDetail ? (
                    <>
                        <div className="class__wrapper__left">
                            <img src={avatar} alt="Avatar" />

                            <ul>
                                <li> Update a class</li>
                                <li> Update class name</li>
                            </ul>
                        </div>
                        <div className="class__wrapper__right">
                            <form {...{ onSubmit }} method="post">
                                <div className="form-group">
                                    <label htmlFor="name">Class Name</label>
                                    <input
                                        type="text"
                                        name="classname"
                                        id="classname"
                                        placeholder="Class Name"
                                        className="mb-3"
                                        value={className}
                                        {...{ onChange }}
                                    />

                                    {errID == "UPDATE_CLASS_ERROR" ? (
                                        <div
                                            className="err-msgs"
                                            style={{ color: "red", marginTop: "10px" }}
                                        >
                                            {errMsg}
                                        </div>
                                    ) : null}

                                    <button color="dark" style={{ marginTop: "1rem" }}>
                                        Update Class Records
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

export default UpdateClass;