import React from 'react';
import './App.css';
import {CreateTask} from "components/admin/createTask/CreateTask";
import {ViewAllTasks} from "components/admin/viewAllTasks/ViewAllTasks";
import {Navigate, Route, Routes} from "react-router-dom";
import {Error404} from "components/error404/Error404";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Navigate to={'/admin/createTask'}/>}/>
        <Route path={'/admin/createTask'} element={<CreateTask/>}/>
        <Route path={'/admin/viewAllTasks'} element={<ViewAllTasks/>}/>
        <Route path={'*'} element={<Error404/>}/>
      </Routes>
    </div>
  );
}

export default App;
