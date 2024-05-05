import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { UserProvider } from './components/UserContext';
import MainList from './pages/MainList';
import NavBar from './components/NavBar';
import {
    ADD_ROUTE,
    ADMIN_ROUTE,
    CURATOR_ROUTE,
    STUDENT_ROUTE,
    UPDATE_ROUTE,
    USER_ROUTE,
    VIEW_ROUTE
} from './utils/consts';
import UserPage from "./pages/UserPage";
import UpdatePage from "./pages/UpdatePage";
import ViewPage from "./pages/ViewPage";
import AdminPage from "./pages/AdminPage";
import AddUser from "./pages/AddUser";
import {UserUtils} from "./utils/UserUtils";
import AppRouter from "./components/AppRouter";

const userListUtils = new UserUtils(); // Create an instance of the MainListStore

const App = observer(() => {
    return (
        <BrowserRouter>
            <UserProvider>
                <NavBar />
                <AppRouter/>
                {/*<Routes>*/}
                {/*    <Route*/}
                {/*        path="/"*/}
                {/*        element={<MainList store={userListUtils} />} // Pass the store as a prop to the MainList component*/}
                {/*    />*/}
                {/*    <Route*/}
                {/*        exact*/}
                {/*        path={STUDENT_ROUTE}*/}
                {/*        element={<MainList store={userListUtils} role="student" />} // Pass the store and role prop to the MainList component*/}
                {/*    />*/}
                {/*    <Route*/}
                {/*        exact*/}
                {/*        path={CURATOR_ROUTE}*/}
                {/*        element={<MainList store={userListUtils} role="curator" />} // Pass the store and role prop to the MainList component*/}
                {/*    />*/}
                {/*    <Route*/}
                {/*        exact*/}
                {/*        path={USER_ROUTE}*/}
                {/*        element={<UserPage/>} // Pass the store and role prop to the MainList component*/}
                {/*    />*/}
                {/*    <Route*/}
                {/*        exact*/}
                {/*        path={UPDATE_ROUTE}*/}
                {/*        element={<UpdatePage/>} // Pass the store and role prop to the MainList component*/}
                {/*    />*/}
                {/*    <Route*/}
                {/*        exact*/}
                {/*        path={VIEW_ROUTE}*/}
                {/*        element={<ViewPage/>} // Pass the store and role prop to the MainList component*/}
                {/*    />*/}
                {/*    <Route*/}
                {/*        exact*/}
                {/*        path={ADMIN_ROUTE}*/}
                {/*        element={<AdminPage/>} // Pass the store and role prop to the MainList component*/}
                {/*    />*/}
                {/*    <Route*/}
                {/*        exact*/}
                {/*        path={ADD_ROUTE}*/}
                {/*        element={<AddUser/>} // Pass the store and role prop to the MainList component*/}
                {/*    />*/}
                {/*</Routes>*/}
            </UserProvider>
        </BrowserRouter>
    );
});

export default App;
