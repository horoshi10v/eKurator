import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import { MDBSelect } from 'mdb-react-ui-kit';
import Select from 'react-select';
import {useUserData} from "../http/useUserData";

function UpdatePage() {
    const [interest, setInterest] = useState([]);
    const { userId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const userData = useUserData(userId);
    const [picture, setPicture] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [stage, setStage] = useState('');
    const [department, setDepartment] = useState('');
    const [interests, setInterests] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);
    //const [interestsString, setInterestsString] = useState('');

    useEffect(() => {
        const interestsLabels = selectedInterests.map((option) => option.label);
        const interestsString = interestsLabels.join(', ');
        setInterests(interestsString);
    }, [selectedInterests]);

    const handleInterestsChange = (selectedOptions) => {
        setSelectedInterests(selectedOptions);
    };

    useEffect(() => {
        if (userData) {
            setPicture(userData.picture);
            setName(userData.name);
            setEmail(userData.email);
            setRole(userData.role);
            setStage(userData.stage);
            setDepartment(userData.department);
            setInterests(userData.interests);
            setPhone(userData.phone);
            setDescription(userData.description);
        }
    }, [userData]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            picture,
            email,
            name,
            role,
            stage,
            department,
            interests,
            description: description.replace(/\n/g, '<br>'), // Replace newline characters with <br> tags,
            phone,
        };

        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                // Handle success
                navigate(`/user/${userId}`);
                console.log('User updated successfully');
                // Redirect or show a success message
            } else {
                // Handle error
                console.error('Error updating user');
                // Show an error message
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (!userData) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="container">
            <h1>Оновити інформацію користувача</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        URL-посилання на зображення
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Ім'я
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                        Роль
                    </label>
                    <select
                        className="form-control"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="">Оберіть роль</option>
                        <option value="студент">студент</option>
                        <option value="куратор">куратор</option>
                    </select>
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="та впишіть группу або посаду"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="stage" className="form-label">
                        Ступінь
                    </label>
                    <select
                        className="form-control"
                        id="stage"
                        value={stage}
                        onChange={(e) => setStage(e.target.value)}
                    >
                        <option value="">Оберіть ступінь</option>
                        <option value="бакалавр">бакалавр</option>
                        <option value="магістр">магістр</option>
                        <option value="бакалавр, магістр">все</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="department" className="form-label">
                        Кафедра
                    </label>
                    <select
                        className="form-control"
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="ЕОМ">ЕОМ</option>
                        <option value="АПОТ">АПОТ</option>
                        <option value="БІТ">БІТ</option>
                        <option value="КІТС">КІТС</option>
                        <option value="ІУС">ІУС</option>
                        <option value="ШІ">ШІ</option>
                        <option value="СТ">СТ</option>
                        <option value="ПІ">ПІ</option>
                        <option value="МСТ">МСТ</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="interests" className="form-label">
                        Інтереси
                    </label>
                    <Select
                        id="interests"
                        className="form-control"
                        isMulti
                        options={[
                            { value: 'IoT', label: 'IoT' },
                            { value: 'Cloud-технології', label: 'Cloud-технології' },
                            { value: 'Комп\'ютерні системи і мережі', label: 'Комп\'ютерні системи і мережі' },
                            { value: 'AI', label: 'AI' },
                            { value: 'Backend', label: 'Backend' },
                            { value: 'Frontend', label: 'Frontend' },
                            { value: 'ІТ-інфраструктура', label: 'ІТ-інфраструктура' },
                            { value: 'Інтелектуальна обробка даних', label: 'Інтелектуальна обробка даних' },
                            { value: 'C++', label: 'C++' },
                            { value: 'Java', label: 'Java' },
                            { value: 'JavaScript', label: 'JavaScript' },
                        ]}
                        value={selectedInterests}
                        onChange={handleInterestsChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="interestsString"
                        value={interests}
                        placeholder="Вкажіть через кому"
                        onChange={(e) => setInterests(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Про себе
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary mb-5">
                    Оновити
                </button>
            </form>
        </div>
    );
}

export default UpdatePage;
