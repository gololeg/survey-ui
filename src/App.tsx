import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {ViewAllTasksDashboard} from "pages/admin/viewAllTasksDashboard/ViewAllTasksDashboard";
import {CreateTask} from "pages/admin/createTask/CreateTask";
import {Error404} from "pages/error404/Error404";
import {ViewTaskModal} from "pages/admin/viewTaskModal/ViewTaskModal";
import {Settings} from "pages/admin/settings/Settings";
import Index from "pages/Index";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to={'/admin/tasks/create'}/>}/>
        <Route path='/admin/tasks/create' element={<CreateTask/>}/>
        <Route path='/admin/tasks/all' element={<ViewAllTasksDashboard/>}/>
        <Route path='/admin/tasks/all/modal/:id' element={<ViewTaskModal/>}/>
        <Route path='/admin/settings' element={<Settings/>}/>
        <Route path='/hueta' element={<Index/>}/>
        <Route path={'*'} element={<Error404/>}/>
      </Routes>
    </div>
  );
}

export default App;
