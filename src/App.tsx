import React from 'react';
import './App.css';
import {CreateTask} from "components/admin/createTask/CreateTask";
import {ViewAllTasks} from "components/admin/viewAllTasks/ViewAllTasks";
import {Navigate, Route, Routes} from "react-router-dom";
import {Error404} from "components/error404/Error404";
import {ViewTaskModal} from "components/admin/viewAllTasks/viewTaskModal/ViewTaskModal";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Navigate to={'/admin/tasks/create'}/>}/>
        <Route path={'/admin/tasks/create'} element={<CreateTask/>}/>
        <Route path={'/admin/tasks/all'} element={<ViewAllTasks/>}/>
        <Route path='/admin/tasks/all/modal/:id' element={<ViewTaskModal/>}/>
        <Route path={'*'} element={<Error404/>}/>
      </Routes>
    </div>
  );
}

export default App;
