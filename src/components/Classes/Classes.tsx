import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getClasses } from "../../store/reducers/classReducer";
import { AppDispatch, RootState } from "../../store";
import AppNavbar from "../AppNavbar";

const Classes: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const classes = useSelector((state: RootState) => state.class.classes);

    useEffect(() => {
        dispatch(getClasses());
    }, [dispatch]);

    return (
        <div className="container">
            <div className="student__wrapper">
                <AppNavbar />

                <div className="classes__wrapper">
                    {classes.length > 0 ? (
                        <ul className="allClasses">
                            {classes.map(({ className, id }, index) => { //id was outside } there was slug too
                                return (
                                    <li key={index}>
                                        <Link to={`/about-class/${id}`}>
                                            {className.toUpperCase()}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div>
                            <h3>No Course Available</h3>
                            <br />
                            <Link to="/create-class"> Create a class</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Classes;