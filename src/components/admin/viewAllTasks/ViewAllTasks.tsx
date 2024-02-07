import React, {JSX, useEffect} from 'react';
import {useAppDispatch} from "hooks/dispatch";
import {useAppSelector} from "hooks/selectors";
import styles from "./viewAllTasks.module.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

export const ViewAllTasks = () => {
  const {fetchTasks} = useAppDispatch();
  const allTasks = useAppSelector(state => state.tasks);


  useEffect(() => {
    fetchTasks()
  }, []);

  function createData(
    id: number,
    name: string,
    description: string,
    type: string,
    level: string,
    actions: string,
    image: JSX.Element
  ) {
    return {id, name, description, type, level, actions, image};
  }

  const rows = allTasks.map(el => createData(el.id, el.name, el.description, (el.type.name as string), (el.level.name as string), 'blabla', <Link to={`/admin/tasks/all/modal/${el.id}`}>Show</Link>))

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell align="right" >Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Level</TableCell>
            <TableCell align="right">Actions</TableCell>
            <TableCell align="right">Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.level}</TableCell>
              <TableCell align="right">{row.actions}</TableCell>
              <TableCell align="right">{row.image}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

