
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../assets/styles/main.module.scss';
import {

} from "../actions/index.action"
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="right" component="th" scope="row">{row.date}</TableCell>
                <TableCell align="right">{row.day.maxtemp_c}</TableCell>
                <TableCell align="right">{row.day.mintemp_c}</TableCell>
                <TableCell align="right">{row.day.avghumidity}</TableCell>
                <TableCell align="right">{row.day.totalsnow_cm}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Hour
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Time</TableCell>
                                        <TableCell align="right">Maximum temperature(C)</TableCell>
                                        <TableCell align="right">Wind speed(kph)</TableCell>
                                        <TableCell align="right">Average Humidity</TableCell>
                                        <TableCell align="right">Chane Of Snow (%)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.hour.map((historyRow) => (
                                        <TableRow key={historyRow.time_epoch}>
                                            <TableCell component="th" scope="row">{historyRow.time}</TableCell>
                                            <TableCell align="right">{historyRow.temp_c}</TableCell>
                                            <TableCell align="right">{historyRow.wind_kph}</TableCell>
                                            <TableCell align="right">{historyRow.humidity}</TableCell>
                                            <TableCell align="right">{historyRow.chance_of_snow}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}


export function TableComponent(props) {

    const { forecastday } = props;


    return (
        <div className={styles.main}>
            {
                forecastday ?
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="right">Day</TableCell>
                                    <TableCell align="right">Maximum temperature</TableCell>
                                    <TableCell align="right">Minimum temperature</TableCell>
                                    <TableCell align="right">Average Humidity</TableCell>
                                    <TableCell align="right">Total snow</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {forecastday ? forecastday.map((row) => (
                                    <Row key={row.date_epoch} row={row} />
                                ))
                                    :
                                    null
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    null
            }

        </div>
    )
}
