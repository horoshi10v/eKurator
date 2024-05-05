import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import MainList from '../pages/MainList';
import {
    ADD_ROUTE,
    ADMIN_ROUTE,
    CURATOR_ROUTE,
    STUDENT_ROUTE,
    UPDATE_ROUTE,
    USER_ROUTE,
    VIEW_ROUTE
} from "../utils/consts";
import UserPage from "../pages/UserPage";
import UpdatePage from "../pages/UpdatePage";
import ViewPage from "../pages/ViewPage";
import AdminPage from "../pages/AdminPage";
import AddUser from "../pages/AddUser";
import {UserUtils} from "../utils/UserUtils";

const userListUtils = new UserUtils(); // Create an instance of the MainListStore

const AppRouter = observer(() => {
    return (
        <Routes>
            <Route
                path="/"
                element={<MainList store={userListUtils} />} // Pass the store as a prop to the MainList component
            />
            <Route
                exact
                path={STUDENT_ROUTE}
                element={<MainList store={userListUtils} role="student" />} // Pass the store and role prop to the MainList component
            />
            <Route
                exact
                path={CURATOR_ROUTE}
                element={<MainList store={userListUtils} role="curator" />} // Pass the store and role prop to the MainList component
            />
            <Route
                exact
                path={USER_ROUTE}
                element={<UserPage/>} // Pass the store and role prop to the MainList component
            />
            <Route
                exact
                path={UPDATE_ROUTE}
                element={<UpdatePage/>} // Pass the store and role prop to the MainList component
            />
            <Route
                exact
                path={VIEW_ROUTE}
                element={<ViewPage/>} // Pass the store and role prop to the MainList component
            />
            <Route
                exact
                path={ADMIN_ROUTE}
                element={<AdminPage/>} // Pass the store and role prop to the MainList component
            />
            <Route
                exact
                path={ADD_ROUTE}
                element={<AddUser/>} // Pass the store and role prop to the MainList component
            />
        </Routes>
    );
});

export default AppRouter;
