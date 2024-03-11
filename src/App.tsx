import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {ViewAllTasksDashboard} from "pages/admin/viewAllTasksDashboard/ViewAllTasksDashboard";
import {CreateTask} from "pages/admin/createTask/CreateTask";
import {Error404} from "pages/error404/Error404";
import {Login} from "pages/login/Login";
import {Settings} from "pages/admin/settings/Settings";
import {ViewTaskModal} from "pages/admin/viewTaskModal/ViewTaskModal";
import {Navigate} from "react-router-dom";
import {ViewAllAccessesDashboard} from "pages/admin/accesses/viewAllAccessesDashboard/ViewAllAccessesDashboard";
import {ViewAccessModal} from "pages/admin/accesses/viewAccessModal/ViewAccessModal";



function App() {

    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Navigate to={'/login'}/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path='/admin/tasks/create' element={<CreateTask/>}/>
                <Route path='/admin/tasks/all' element={<ViewAllTasksDashboard/>}/>
                <Route path='/admin/tasks/all/modal/:id' element={<ViewTaskModal/>}/>
                <Route path='/admin/settings' element={<Settings/>}/>
                <Route path='/admin/accesses/all' element={<ViewAllAccessesDashboard/>}/>
                <Route path='/admin/access/modal/:email' element={<ViewAccessModal/>}/>
                <Route path={'*'} element={<Error404/>}/>
            </Routes>
        </div>
    );
}

export default App;
