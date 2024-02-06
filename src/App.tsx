import React from 'react';
import './App.css';
import {CreateTask} from "components/admin/createTask/CreateTask";
import {ViewAllTasks} from "components/admin/viewAllTasks/ViewAllTasks";


function App() {
  return (
    <div className="App">
     <CreateTask/>
     {/* <ViewAllTasks/>*/}
    </div>
  );
}

export default App;
