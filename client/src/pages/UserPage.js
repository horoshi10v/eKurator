import React, { useContext } from 'react';
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

function UserPage() {
    const navigate = useNavigate();
    const { user, updateUser } = useContext(UserContext); // Add updateUser from UserContext

    if (!user) {
        return (
            <div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <div className="card p-5">
                    <p className="text-center mb-4">Щоб зайти на власну сторінку, спочатку авторизуйтеся</p>
                    <div className="d-flex justify-content-center">
                        <a href="http://localhost:8080/google_login" className="btn btn-success">
                            Вхід
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    const handleUserUpdateClick = (userId) => {
        navigate(`/user/${userId}/update`);
    };

    const handleUserDeleteClick = async (userId) => {
        const confirmed = window.confirm("Ви впевнені, що хочете видалити свою анкету?");
        if (confirmed) {
            try {
                await fetch(`http://127.0.0.1:8080/user/${userId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });
                updateUser(null);
                navigate('/');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const formattedDescription = user.description.replace(/\n/g, "<br>");

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 mt-2 mb-2">
                    <div className="card">
                        <img
                            src={user.picture}
                            alt="User"
                            className="card-img-top"
                            style={{ width: '40%' }}
                        />
                        <div className="card-body">
                            <h2 className="card-title">{user.name}</h2>
                            <p className="card-text">
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </p>
                            <p className="card-text">
                                <strong>Роль: </strong>{user.role}
                            </p>
                            <p className="card-text">
                                {user.phone}
                            </p>
                            <p className="card-text">
                                <strong>Ступінь: </strong>{user.stage}
                            </p>
                            <p className="card-text">
                                <strong>Кафедра: </strong>{user.department}
                            </p>
                            <p className="card-text">
                                <strong>Інтереси: </strong>{user.interests}
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleUserUpdateClick(user.ID)}
                            >
                                Оновити
                            </button>
                            <button
                                className="btn btn-danger m-2"
                                onClick={() => handleUserDeleteClick(user.ID)}
                            >
                                Видалити
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 mt-2 mb-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Інформація про мене</h5>
                            <p className="card-text" dangerouslySetInnerHTML={{ __html: formattedDescription }}></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
