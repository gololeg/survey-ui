import React, {JSX, useEffect} from 'react';
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link, Navigate} from 'react-router-dom';
import {LinearProgress} from "@mui/material";
import styles from "./viewAllTasksDashboard.module.css";
import {SideBar} from "components/sideBar/SideBar";
import {CustomizedSnackBar} from "components/customizedSnackBar/CustomizedSnackBar";


export const ViewAllTasksDashboard = () => {
    const {fetchTasks} = useAppDispatch();
    const {allTasks} = useAppSelector(state => state.tasks);
    const {statusLoading} = useAppSelector(state => state.loading);
    const getAllTasksError = useAppSelector(state => state.error.getAllTasksError);
    const isLoggedIn = useAppSelector(state => state.users.isLoggedIn)
    const {isAuthMe} = useAppDispatch();

    useEffect(() => {
        isAuthMe()
            .then((response: any) => {
               if(response.payload === true){
                   fetchTasks();
               }
            })


    }, []);

    function createData(
        id: number,
        name: string,
        description: string,
        type: string,
        level: string,
        action: JSX.Element
    ) {
        return {id, name, description, type, level, action};
    }

    const rows = allTasks.map((el) => createData(el.id, el.name, el.description, (el.type.name as string), (el.level.name as string),
        <Link to={`/admin/tasks/all/modal/${el.id}`}>Show task</Link>));

    if (isLoggedIn === false) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.content}>
            <SideBar/>
            <div className={styles.dashBoard}>
                <TableContainer component={Paper}>
                    {statusLoading === 'loading' && <LinearProgress/>}


                    <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>№</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Level</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">{++index}</TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">{row.type}</TableCell>
                                    <TableCell align="right">{row.level}</TableCell>
                                    <TableCell align="right">{row.action}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {
                getAllTasksError && <CustomizedSnackBar error={getAllTasksError}/>
            }
        </div>
    );
};

