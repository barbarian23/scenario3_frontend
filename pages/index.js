import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

const columns = [
  { id: 'id', label: 'Id', minWidth: 170 },
  { id: 'BookName', label: 'BookName', minWidth: 100 },
  {
    id: 'BookAuthorId',
    label: 'BookAuthorId',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'ShortDescription',
    label: 'ShortDescription',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'AvailableNumber',
    label: 'AvailableNumber',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  {
    "BookId": 2,
    "BookName": " Pilgrim\"s Progress",
    "BookAuthorId": 2,
    "ShortDescription": "The one with the Slough of Despond and Vanity Fair. ",
    "AvailableNumber": "59"
  },
  {
    "BookId": 2,
    "BookName": " Pilgrim\"s Progress",
    "BookAuthorId": 2,
    "ShortDescription": "The one with the Slough of Despond and Vanity Fair. ",
    "AvailableNumber": "59"
  },
  {
    "BookId": 2,
    "BookName": " Pilgrim\"s Progress",
    "BookAuthorId": 2,
    "ShortDescription": "The one with the Slough of Despond and Vanity Fair. ",
    "AvailableNumber": "59"
  },
  {
    "BookId": 2,
    "BookName": " Pilgrim\"s Progress",
    "BookAuthorId": 2,
    "ShortDescription": "The one with the Slough of Despond and Vanity Fair. ",
    "AvailableNumber": "59"
  },
  {
    "BookId": 2,
    "BookName": " Pilgrim\"s Progress",
    "BookAuthorId": 2,
    "ShortDescription": "The one with the Slough of Despond and Vanity Fair. ",
    "AvailableNumber": "59"
  }
];

export default function Main() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(()=>{
    axios({
      method: 'get',
      url: 'http://',
      responseType: 'stream'
    })
      .then(function (response) {
          //rows
      });
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
