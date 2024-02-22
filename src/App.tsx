import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {ViewAllTasksDashboard} from "pages/admin/viewAllTasksDashboard/ViewAllTasksDashboard";
import {CreateTask} from "pages/admin/createTask/CreateTask";
import {Error404} from "pages/error404/Error404";
import {ViewTaskModal} from "pages/admin/viewTaskModal/ViewTaskModal";
import {Settings} from "pages/admin/settings/Settings";
import {Login} from "pages/login/Login";




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to={'/login'}/>}/>
        <Route path='/admin/tasks/create' element={<CreateTask/>}/>
        <Route path='/admin/tasks/all' element={ <ViewAllTasksDashboard/>}/>
        <Route path='/admin/tasks/all/modal/:id' element={<ViewTaskModal/>}/>
        <Route path='/admin/settings' element={ <Settings/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'*'} element={<Error404/>}/>
      </Routes>
    </div>
  );
}
export default App;
