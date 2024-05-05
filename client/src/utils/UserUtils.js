import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {makeAutoObservable, makeObservable, observable} from "mobx";

export class UserUtils {
    users = []; // Observable array for storing users

    constructor() {
        makeObservable(this, {
            users: observable,
        });
    }

    setUsers(users) {
        this.users = users;
    }
}

export default class UserStore{
    constructor() {
        this._user = {}
        makeAutoObservable(this)
    }
    get user() {
        return this._user
    }
}


export const fetchUsers = async (store, role) => {
    try {
        const response = await fetch(`http://localhost:8080/users?role=${role}`);
        const data = await response.json();
        store.setUsers(data);
    } catch (error) {
        console.error('Error fetching user list:', error);
    }
};


export const useUserList = (store, role) => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [interestFilter, setInterestFilter] = useState('');
    const [stageFilter, setStageFilter] = useState('');

    useEffect(() => {
        fetchUsers(store, role);
    }, [role]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDepartmentFilterChange = (e) => {
        setDepartmentFilter(e.target.value);
    };

    const handleInterestFilterChange = (e) => {
        setInterestFilter(e.target.value);
    };

    const handleStageFilterChange = (e) => {
        setStageFilter(e.target.value);
    };

    const handleUserClick = (userId) => {
        navigate(`/user/${userId}`);
    };

    const getFilteredUsers = () => {
        return store.users.filter(
            (user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (departmentFilter === '' || user.department === departmentFilter) &&
                (stageFilter === '' || user.stage.toLowerCase().includes(stageFilter.toLowerCase())) &&
                (interestFilter === '' || user.interests.toLowerCase().includes(interestFilter.toLowerCase()))
        );
    };

    return {
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
    };
};
