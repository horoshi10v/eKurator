import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from "./UserContext";

function Navbar() {
    const { user, updateUser } = useContext(UserContext);
    const location = useLocation();

    const handleLogout = () => {
        fetch('http://localhost:8080/google_logout', { credentials: 'include' })
            .then(() => {
                updateUser(null);
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark mb-2" style={{ backgroundColor: '#3064cc' }}>
            <div className="container">
                <Link className="navbar-brand" to="/">
                    єКуратор
                </Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <Link className="nav-link" to="/">
                                Головна
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/bachelor' ? 'active' : ''}`}>
                            <Link className="nav-link" to="users/students">
                                Студенти
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/master' ? 'active' : ''}`}>
                            <Link className="nav-link" to="users/curators">
                                Куратори
                            </Link>
                        </li>
                    </ul>
                </div>

                {!user ? (
                    <div className="ml-auto">
                        <a href="http://localhost:8080/google_login" className="btn btn-success">
                            Вхід
                        </a>
                    </div>
                ) : (
                    <div className="ml-auto d-flex align-items-center">
                        {user.role === 'admin' && (
                            <Link to="/admin" className="btn btn-danger me-3">
                                Адмін панель
                            </Link>
                        )}
                        <a href="/user" className="text-decoration-none">
                            <img
                                src={user.picture}
                                alt="User"
                                className="rounded-circle"
                                style={{ width: '50px' }}
                            />
                        </a>
                        <button className="btn btn-warning ms-3" onClick={handleLogout}>
                            Вихід
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );

}

export default Navbar;
