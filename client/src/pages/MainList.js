import React from 'react';
import { observer } from 'mobx-react-lite';
import {useUserList} from "../utils/UserUtils";

const MainList = observer(({ store, role }) => {
    const {
        searchQuery,
        departmentFilter,
        interestFilter,
        stageFilter,
        handleSearchInputChange,
        handleDepartmentFilterChange,
        handleInterestFilterChange,
        handleStageFilterChange,
        handleUserClick,
        getFilteredUsers,
    } = useUserList(store, role);

    const filteredUsers = getFilteredUsers();

    const userCount = filteredUsers.length;

    const stage = [
        ...new Set(store.users.map((user) => user.stage.split(',').map((stage) => stage.trim())).flat()),
    ];
    const departments = [...new Set(store.users.map((user) => user.department))];
    const interests = [
        ...new Set(store.users.map((user) => user.interests.split(',').map((interest) => interest.trim())).flat()),
    ];

    return (
        <div className="container">
            <h1 className="mt-4">Всього користувачів - {userCount}</h1> {/* Display user count */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Пошук по імені"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <div className="d-flex mb-3">
                <div className="me-2">
                    <select className="form-select" value={departmentFilter} onChange={handleDepartmentFilterChange}>
                        <option value="">Всі кафедри</option>
                        {departments.map((department) => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select className="form-select" value={interestFilter} onChange={handleInterestFilterChange}>
                        <option value="">Всі інтереси</option>
                        {interests.map((interest) => (
                            <option key={interest} value={interest}>
                                {interest}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="px-2">
                    <select className="form-select" value={stageFilter} onChange={handleStageFilterChange}>
                        <option value="">Всі ступені</option>
                        {stage.map((stage) => (
                            <option key={stage} value={stage}>
                                {stage}
                            </option>
                        ))}
                    </select>
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
                            onClick={() => handleUserClick(user.ID)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={user.picture} alt="User" className="rounded-circle me-3" style={{ width: '50px' }} />
                            <div className="d-flex flex-column">
                                <div className="d-flex">
                                    <div className="me-3">{user.name}</div>
                                    <div className="me-3">Кафедра: {user.department}</div>
                                    <div className="me-3">Інтереси: {user.interests}</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
});

export default MainList;
