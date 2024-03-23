import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {ViewAllTasksDashboard} from "pages/admin/viewAllTasksDashboard/ViewAllTasksDashboard";
import {CreateTask} from "pages/admin/createTask/CreateTask";
import {Error404} from "pages/error404/Error404";
import {Login} from "pages/login/Login";
import {Settings} from "pages/admin/settings/Settings";
import {ViewTaskModal} from "pages/admin/viewTaskModal/ViewTaskModal";
import {ViewAllAccessesDashboard} from "pages/admin/accesses/viewAllAccessesDashboard/ViewAllAccessesDashboard";
import {ViewAndChangeAccessModal} from "pages/admin/accesses/viewAndChangeAccessModal/ViewAndChangeAccessModal";
import {GenerateSurvey} from "pages/generateSurvey/GenerateSurvey";
import {Survey} from "pages/survey/Survey";
import {SurveyResult} from "pages/surveyResult/SurveyResult";
import {CreateAccesses} from "pages/admin/createAccesses/CreateAccesses";


function App() {

    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Survey/>}/>
                <Route path={'/generate/survey'} element={<GenerateSurvey/>}/>
                <Route path={'/survey/result'} element={<SurveyResult/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path='/admin/tasks/create' element={<CreateTask/>}/>
                <Route path='/admin/tasks/all' element={<ViewAllTasksDashboard/>}/>
                <Route path='/admin/tasks/all/modal/:id' element={<ViewTaskModal/>}/>
                <Route path='/admin/settings' element={<Settings/>}/>
                <Route path='/admin/accesses/all' element={<ViewAllAccessesDashboard/>}/>
                <Route path='/admin/accesses/create' element={<CreateAccesses/>}/>
                <Route path='/admin/access/modal/:email' element={<ViewAndChangeAccessModal/>}/>
                <Route path={'*'} element={<Error404/>}/>
            </Routes>
        </div>
    );
}

export default App;
