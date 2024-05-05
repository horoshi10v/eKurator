import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from "react-bootstrap";

const AdminPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUserClick = (userId) => {
        navigate(`/user/${userId}`);
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/users', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDeleteUser = (userId, userName) => {
        const confirmDelete = window.confirm(`Ви впевнені, що хочете видалити користувача ${userName}?`);
        if (confirmDelete) {
            deleteUser(userId).then(r => fetchUsers());
        }
    };

    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.ok) {
                console.log('User deleted successfully');
                fetchUsers(); // Refresh the user list
            } else {
                console.error('Error deleting user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleUpdateUser = (userId) => {
        navigate(`/user/${userId}/update`); // Redirect to the update page for the selected user
    };

    const handleAddUser = () => {
        navigate('/adduser'); // Redirect to the AddUser component
    };

    return (
        <div className="container">
            <div>
                <h1>Адмін панель</h1>
                <div className="row mb-4">
                    <div className="col-auto">
                        <Button variant="outline-info" className="p-2" onClick={handleAddUser}>
                            Додати користувача
                        </Button>
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Пошук..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                </div>
            </div>

            {filteredUsers.length === 0 ? (
                <p>Немає результатів</p>
            ) : (
            <ul className="list-group mb-5">
                    {filteredUsers.map((user) => (
                        <li
                            key={user.ID}
                            className="list-group-item d-flex align-items-center"
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={user.picture} alt="User" className="rounded-circle me-3" style={{ width: '50px' }} />
                            <span onClick={() => handleUserClick(user.ID)}>{user.name}</span>
                            <div className="ms-auto"> {/* Added "ms-auto" class to push the buttons to the right */}
                                <button
                                    className="btn btn-danger m-1"
                                    onClick={() => handleDeleteUser(user.ID, user.name)}
                                >
                                    Видалити
                                </button>
                                <button
                                    className="btn btn-success m-1"
                                    onClick={() => handleUpdateUser(user.ID)}
                                >
                                    Оновити
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminPage;