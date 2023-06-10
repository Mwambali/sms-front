import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();

    // Check if the current route is "/"
    const isHomePage = location.pathname === '/';
    return (
        <nav className="appNavbar">
            {isHomePage ? (
                <ul>
                    <li className="dropdown">
                        <span className="dropdown-name">classes</span>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to="/create-class">Create Class</Link>
                            </li>
                            <li>
                                <Link to="/classes">View Classes</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <span className="dropdown-name">courses</span>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to="/create-course">Create Course</Link>
                            </li>
                            <li>
                                <Link to="/courses">View Courses</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <span className="dropdown-name">students</span>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to="/create-student">Create Student</Link>
                            </li>
                            <li>
                                <Link to="/students">View Students</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li>
                        <Link to="/" className="back-to-home">
                            Back to Home
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;





// import { Link } from "react-router-dom";

// function AppNavbar(): JSX.Element {
//     return (
//         <header className="appNavbar" >
//             <Link to="/" >
//                 <h1>Class Management App </h1>
//             </Link>
//         </header>
//     );
// }

// export default AppNavbar;

