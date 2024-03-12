import React, {useEffect} from 'react';
import styles from './viewAllAccessesDashboard.module.css'
import {useAppDispatch} from "hooks/useAppDispatch";
import {useAppSelector} from "hooks/useAppSelector";
import {Link, Navigate} from "react-router-dom";
import {LinearProgress} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {SideBar} from "components/sideBar/SideBar";


export const ViewAllAccessesDashboard = () => {
    const {fetchAllAccesses} = useAppDispatch();
    const {isAuthMe} = useAppDispatch();
    const accesses = useAppSelector(state => state.accesses.allAccesses);
    const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
    const statusLoading = useAppSelector(state => state.loading.statusLoading)

    useEffect(() => {
        isAuthMe()
            .then((response: any) => {
                if (response.payload) {
                    fetchAllAccesses();
                }
            })
    }, []);


    if (isLoggedIn === false) {
        return <Navigate to={'/login'}/>
    }

    function createData(
        email: string,
        attemptsCount: number,
        action: JSX.Element,

    ) {
        return { email, attemptsCount, action};
    }


    const rows = accesses.map( el => createData( el.email, el.attemptsCount, <Link to={`/admin/access/modal/:${el.email}`}>Show access</Link>))
    return (
        <div className={styles.block}>
            <SideBar/>
          <div className={styles.dashboard}>
              {statusLoading === 'loading' && <LinearProgress/>}
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                          <TableRow>
                              <TableCell>№</TableCell>
                              <TableCell align="right">Email</TableCell>
                              <TableCell align="right">Attempts count</TableCell>
                              <TableCell align="right">Action</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {rows.map((row,index) => (

                              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell component="th" scope="row">{index + 1}</TableCell>
                                  <TableCell align="right">{row.email}</TableCell>
                                  <TableCell align="right">{row.attemptsCount}</TableCell>
                                  <TableCell align="right">{row.action}</TableCell>
                              </TableRow>

                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
          </div>
        </div>
    );
};

