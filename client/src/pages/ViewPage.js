import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {UserContext} from "../components/UserContext";

function ViewPage() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext); // Get the user from UserContext
    const [viewData, setViewData] = useState(null);

    const handleUserClick = (userId) => {
        navigate(`/user/${userId}/update`);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8080/user/${userId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const content = await response.json();
                setViewData(content);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!viewData) {
        return <div>Loading user data...</div>;
    }

    const formattedDescription = viewData.description.replace(/\n/g, '<br>'); // Replace newline characters with <br> tags

    const isCurrentUser = user && (user.ID === viewData.ID || user.role === 'admin'); // Check if the user is the current user or has admin role

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 mt-2 mb-2">
                    <div className="card">
                        <img
                            src={viewData.picture}
                            alt="User"
                            className="card-img-top"
                            style={{ width: '40%' }}
                        />
                        <div className="card-body">
                            <h2 className="card-title">{viewData.name}</h2>
                            <p className="card-text">
                                <a href={`mailto:${viewData.email}`}>{viewData.email}</a>
                            </p>
                            <p className="card-text">
                                <strong>Роль: </strong>
                                {viewData.role}
                            </p>
                            <p className="card-text">
                                {viewData.phone}
                            </p>
                            <p className="card-text">
                                <strong>Кафедра: </strong>
                                {viewData.department}
                            </p>
                            <p className="card-text">
                                <strong>Ступінь: </strong>
                                {viewData.stage}
                            </p>
                            <p className="card-text">
                                <strong>Інтереси: </strong>
                                {viewData.interests}
                            </p>
                            {isCurrentUser && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleUserClick(viewData.ID)}
                                >
                                    Оновити
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-8 mt-2 mb-2">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Інформація про користувача</h5>
                            <p
                                className="card-text"
                                dangerouslySetInnerHTML={{ __html: formattedDescription }}
                            ></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPage;
